import db from "../config/db.js";

/**
 * Shared helper: checks whether a user is allowed to access a given course's content.
 *
 * - admin  → always allowed
 * - instructor → allowed only if they own the course
 * - student → allowed only if they have an active enrollment in a batch for that course
 *
 * Returns true if access is granted, false otherwise.
 */
const canAccessCourseContent = async (userId, role, courseId) => {
  if (role === "admin") {
    return true;
  }

  if (role === "instructor") {
    const result = await db.query(
      `SELECT id FROM courses WHERE id = $1 AND instructor_id = $2`,
      [courseId, userId]
    );
    return result.rows.length > 0;
  }

  if (role === "student") {
    // Student must have an active enrollment in a batch linked to this course
    const result = await db.query(
      `SELECT be.id
       FROM batch_enrollments be
       JOIN batches b ON be.batch_id = b.id
       WHERE be.user_id = $1
         AND b.course_id = $2
         AND be.status = true`,
      [userId, courseId]
    );
    return result.rows.length > 0;
  }

  return false;
};

const getCourseContent = async (req, res) => {
  const { courseId } = req.params;
  const { userId, role } = req.user;

  try {
    const allowed = await canAccessCourseContent(userId, role, courseId);

    if (!allowed) {
      return res.status(403).json({ message: "Access denied. You must be enrolled in this course." });
    }

    const result = await db.query(
      `
        SELECT
          cm.id AS module_id,
          cm.title AS module_title,
          COALESCE(
            json_agg(
              json_build_object(
                'id', l.id,
                'title', l.title,
                'video_url', l.video_url,
                'duration', l.duration,
                'completed', COALESCE(lp.completed, false)
              )
              ORDER BY l.order_number
            ) FILTER (WHERE l.id IS NOT NULL),
            '[]'::json
          ) AS lessons
        FROM course_modules cm
        LEFT JOIN lessons l ON l.module_id = cm.id
        LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = $2
        WHERE cm.course_id = $1
        GROUP BY cm.id
        ORDER BY cm.order_number;
      `,
      [courseId, userId]
    );

    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve course content" });
  }
};

const markLessonComplete = async (req, res) => {
  const { lessonId } = req.params;
  const { userId } = req.user;

  try {
    // Security check: student must be enrolled in the course that contains this lesson
    const enrollment = await db.query(
      `SELECT be.id
       FROM batch_enrollments be
       JOIN batches b ON be.batch_id = b.id
       JOIN course_modules cm ON cm.course_id = b.course_id
       JOIN lessons l ON l.module_id = cm.id
       WHERE be.user_id = $1
         AND l.id = $2
         AND be.status = true`,
      [userId, lessonId]
    );

    if (enrollment.rows.length === 0) {
      return res.status(403).json({ message: "Access denied. You must be enrolled in this course." });
    }

    const result = await db.query(
      `
        INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at)
        VALUES ($1, $2, true, NOW())
        ON CONFLICT (user_id, lesson_id)
        DO UPDATE SET completed = true, completed_at = NOW()
        RETURNING *;
      `,
      [userId, lessonId]
    );

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update lesson progress" });
  }
};

export { getCourseContent, markLessonComplete };

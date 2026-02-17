import db from "../config/db.js";

export const getUserDashboard = async (req, res) => {
  try {
    const { userId } = req.user;

    const result = await db.query(
      `WITH enrolled_courses AS (
          SELECT
              c.id AS course_id,
              c.title,
              c.instructor_id,
              u.name AS instructor_name
          FROM batch_enrollments be
          JOIN batches b ON be.batch_id = b.id
          JOIN courses c ON b.course_id = c.id
          JOIN users u ON c.instructor_id = u.id
          WHERE be.user_id = $1
            AND be.status = true
      ),
      lesson_counts AS (
          SELECT
              cm.course_id,
              COUNT(l.id) AS total_lessons
          FROM course_modules cm
          JOIN lessons l ON l.module_id = cm.id
          GROUP BY cm.course_id
      ),
      completed_lessons AS (
          SELECT
              cm.course_id,
              COUNT(lp.id) AS completed_count
          FROM lesson_progress lp
          JOIN lessons l ON lp.lesson_id = l.id
          JOIN course_modules cm ON l.module_id = cm.id
          WHERE lp.user_id = $1
            AND lp.completed = true
          GROUP BY cm.course_id
      )
      SELECT
          ec.course_id,
          ec.title,
          ec.instructor_name,
          COALESCE(lc.total_lessons, 0) AS total_lessons,
          COALESCE(cl.completed_count, 0) AS completed_lessons,
          CASE
              WHEN COALESCE(lc.total_lessons, 0) = 0 THEN 0
              ELSE ROUND(
                  (COALESCE(cl.completed_count, 0)::decimal
                  / lc.total_lessons) * 100
              )
          END AS progress
      FROM enrolled_courses ec
      LEFT JOIN lesson_counts lc ON ec.course_id = lc.course_id
      LEFT JOIN completed_lessons cl ON ec.course_id = cl.course_id;`,
      [userId]
    );

    const courses = result.rows.map((course) => ({
      ...course,
      progress: Number(course.progress || 0),
    }));

    const totalEnrolled = courses.length;
    const completedCourses = courses.filter((course) => course.progress === 100).length;
    const ongoingCourses = courses.filter((course) => course.progress < 100).length;

    const sessionsResult = await db.query(
      `SELECT COUNT(*)::int AS upcoming_sessions
       FROM live_sessions ls
       JOIN batch_enrollments be ON be.batch_id = ls.batch_id
       WHERE be.user_id = $1 AND be.status = true
         AND (ls.status = 'scheduled' OR ls.status = 'live')`,
      [userId]
    );
    const upcomingSessions = sessionsResult.rows[0]?.upcoming_sessions || 0;

    return res.status(200).json({
      stats: {
        totalEnrolled,
        completedCourses,
        ongoingCourses,
        upcomingSessions,
      },
      enrolledCourses: courses.map((course) => ({
        id: course.course_id,
        title: course.title,
        progress: course.progress,
        instructor: course.instructor_name,
      })),
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return res.status(500).json({ message: "Failed to load dashboard" });
  }
};

export const getStudentCourseDetail = async (req, res) => {
  try {
    const { userId } = req.user;
    const { courseId } = req.params;

    const courseResult = await db.query(
      `SELECT
         c.id AS course_id, c.title, c.description, c.price, c.level,
         u.name AS instructor_name,
         b.id AS batch_id, b.batch_name, b.start_date, b.end_date,
         b.status AS batch_status, b.schedule, b.days_of_week, b.session_time
       FROM batch_enrollments be
       JOIN batches b ON be.batch_id = b.id
       JOIN courses c ON b.course_id = c.id
       JOIN users u ON c.instructor_id = u.id
       WHERE be.user_id = $1 AND c.id = $2 AND be.status = true
       LIMIT 1`,
      [userId, courseId]
    );

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ message: "Course not found or not enrolled" });
    }

    const course = courseResult.rows[0];

    const progressResult = await db.query(
      `SELECT
         COUNT(l.id)::int AS total_lessons,
         COUNT(lp.id) FILTER (WHERE lp.completed = true)::int AS completed_lessons
       FROM lessons l
       JOIN course_modules cm ON l.module_id = cm.id
       LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = $1
       WHERE cm.course_id = $2`,
      [userId, courseId]
    );

    const { total_lessons, completed_lessons } = progressResult.rows[0];
    const percentage = total_lessons === 0 ? 0 : Math.round((completed_lessons / total_lessons) * 100);

    const sessionsResult = await db.query(
      `SELECT
         ls.id AS session_id, ls.title AS session_title, ls.description AS session_description,
         ls.scheduled_at, ls.duration_minutes, ls.status AS session_status, ls.join_url
       FROM live_sessions ls
       WHERE ls.batch_id = $1
       ORDER BY ls.scheduled_at ASC`,
      [course.batch_id]
    );

    const attendanceResult = await db.query(
      `SELECT session_id FROM session_attendance WHERE user_id = $1`,
      [userId]
    );
    const attendedSet = new Set(attendanceResult.rows.map((r) => r.session_id));

    const sessions = sessionsResult.rows.map((s) => ({
      ...s,
      attended: attendedSet.has(s.session_id),
    }));

    return res.json({
      course: {
        id: course.course_id,
        title: course.title,
        description: course.description,
        price: course.price,
        level: course.level,
        instructor: course.instructor_name,
      },
      batch: {
        id: course.batch_id,
        name: course.batch_name,
        startDate: course.start_date,
        endDate: course.end_date,
        status: course.batch_status,
        schedule: course.schedule || `${course.days_of_week || "TBA"} | ${course.session_time || "TBA"}`,
      },
      progress: { totalLessons: total_lessons, completedLessons: completed_lessons, percentage },
      sessions,
    });
  } catch (error) {
    console.error("Course detail error:", error);
    return res.status(500).json({ message: "Failed to load course details" });
  }
};

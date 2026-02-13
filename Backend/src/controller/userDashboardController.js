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
LEFT JOIN completed_lessons cl ON ec.course_id = cl.course_id;
`,[userId]
    );

    const courses = result.rows;
    const totalEnrolled = courses.length;
    const completedCourses = courses.filter((c) => c.progress === 100).length;
    const ongoingCourses = courses.filter((c) => c.progress < 100).length;

    return res.status(200).json({
        stats: {
            totalEnrolled,
            completedCourses,
            ongoingCourses,
        },
        enrolledCourses: courses.map((c) => ({
            id: c.course_id,
            title: c.title,
            progress: c.progress,
            instructor: c.instructor_name,
        })),
    });
  } catch (error) {
    console.error("Dashboard error", error);
    return res.status(500).json({ message: "Failed to load dashboard",});
  }
};

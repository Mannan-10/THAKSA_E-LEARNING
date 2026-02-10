import db from "../config/db.js";


const markLessonCompleted = async (req, res) => {
    const { lessonId } = req.params;
    const { userId } = req.user;

    try {

        // Check Enrollment
        const enrollment = await db.query(
            `SELECT be.id FROM batch_enrollments be 
            JOIN batches b ON be.batch_id = b.id
            JOIN course_modules cm ON cm.course_id = b.course_id
            JOIN lessons l ON l.module_id = cm.id
            WHERE be.user_id = $1 AND l.id = $2`,[userId, lessonId]
        );
        
        if (enrollment.rows.length === 0) {
            return res.status(403).json({ message: "Not enrolled in this course" });
        }

        // Insert Or update progress
        const result = await db.query(
            `INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at)
            VALUES ($1, $2, true, NOW())
            ON CONFLICT (user_id, lesson_id)
            DO UPDATE SET completed = true, completed_at = NOW() RETURNING *`,[userId, lessonId]
        );
        res.json({ message: "Lesson marked as completed", progress: result.rows[0]});
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

const getCourseProgress = async (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.user;

    const result = await db.query(
        `SELECT COUNT(lp.id) FILTER (WHERE lp.completed = true) AS completed_lessons,
        COUNT(l.id) AS total_lessons
        FROM lessons l
        JOIN course_modules cm ON l.module_id = cm.id
        LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = $1
        WHERE cm.course_id = $2`,[userId, courseId]
    );
    const { completed_lessons, total_lessons } = result.rows[0];

    res.json({ completed_lessons, total_lessons, 
        percentage: total_lessons === 0 ? 0 : Math.round((completed_lessons / total_lessons) * 100)
    });
}

const getLessonProgress = async (req, res) => {
    const { userId } = req.user;
    const { courseId } = req.params;

    const result = await db.query(
        `SELECT l.id, l.title,
            COALESCE(lp.completed, false) AS completed,
            lp.completed_at
        FROM lessons l
        JOIN course_modules cm ON l.module_id = cm.id
        LEFT JOIN lesson_progress lp
            ON lp.lesson_id = l.id AND lp.user_id = $1
        WHERE cm.course_id = $2
        ORDER BY cm.order_number, l.order_number`,[userId, courseId]
    );

    res.json(result.rows);
}

const getStudentProgress = async (req, res) => {
    const instructorId = req.user.userId;
    const { courseId } = req.params;

    // ownership check
    const course = await db.query(
        `SELECT id FROM courses WHERE id = $1 AND instructor_id = $2`[courseId, instructorId]
    );

    if (course.rows.length === 0) {
        return res.status(403).json({ message: "Not authorized" });
    }

    const result = await db.query(
        `SELECT u.name, u.email, COUNT(lp.id) FILTER (WHERE lp.completed) AS completed_lessons
        FROM users u
        JOIN batch_enrollments be ON be.user_id = u.id
        JOIN batches b ON b.id = be.batch_id
        JOIN course_modules cm ON cm.course_id = b.course_id
        JOIN lessons l ON l.module_id = cm.id
        LEFT JOIN lesson_progress lp ON lp.lesson_id = l.id AND lp.user_id = u.id
        WHERE b.course_id = $1
        GROUP BY u.id
        ORDER BY completed_lessons DESC`,[courseId]
    );

    res.json(result.rows);
}



export {
    markLessonCompleted,
    getCourseProgress,
    getLessonProgress,
    getStudentProgress
}

import db from "../config/db.js";

const getCourseContent = async (req, res) => {
    const { courseId } = req.params;
    const { userId } = req.user;

    try {
        const result = await db.query(
            `
                SELECT 
                    cm.id AS module_id,
                    cm.title AS module_title,
                    json_agg(
                    json_build_object(
                        'id', l.id,
                        'title', l.title,
                        'video_url', l.video_url,
                        'duration', l.duration,
                        'completed', COALESCE(lp.completed, false)
                    )
                    ORDER BY l.order_number
                    ) AS lessons
                FROM course_modules cm
                LEFT JOIN lessons l ON l.module_id = cm.id
                LEFT JOIN lesson_progress lp 
                    ON lp.lesson_id = l.id AND lp.user_id = $2
                WHERE cm.course_id = $1
                GROUP BY cm.id
                ORDER BY cm.order_number
            `,
            [courseId, userId]
        );

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const markLessonComplete = async (req, res) => {
    const { lessonId } = req.params;
    const { userId } = req.user;

    try {
        const result = await db.query(
            `
                INSERT INTO lesson_progress (user_id, lesson_id, completed, completed_at)
                VALUES ($1, $2, true, NOW())
                ON CONFLICT (user_id, lesson_id)
                DO UPDATE SET completed = true, completed_at = NOW()
                RETURNING *
            `,[userId, lessonId]
        );

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getCourseContent, markLessonComplete};

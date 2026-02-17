import db from "../config/db.js";

const createLesson = async (req, res) => {
    const instructorId = req.user.userId;
    const { moduleId } = req.params;
    const { title, video_url, duration, order_number } = req.body;

    // 1. Verify module ownership via course
    const moduleCheck = await db.query(
        `SELECT cm.id, c.id AS course_id FROM course_modules cm JOIN courses c ON cm.course_id = c.id WHERE cm.id = $1 AND c.instructor_id = $2`, [moduleId, instructorId]
    );

    if (moduleCheck.rows.length === 0) {
        return res.status(403).json({ message: "Not allowed" });
    }

    // 2. Insert lesson
    const result = await db.query(
        `INSERT INTO lessons (module_id, title, video_url, duration, order_number) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [moduleId, title, video_url, duration, order_number]
    );

    // 3. Reset course approval
    await db.query(
        `UPDATE courses SET approval_status = 'pending' WHERE id = $1 AND approval_status = 'approved'`, [moduleCheck.rows[0].course_id]
    );

    res.status(201).json(result.rows[0]);
}

const getModuleLessons = async (req, res) => {
    const { moduleId } = req.params;

    const result = await db.query(
        `SELECT * FROM lessons WHERE module_id = $1 ORDER BY order_number`, [moduleId]
    );

    res.json(result.rows);
}

const updateLesson = async (req, res) => {
    const instructorId = req.user.userId;
    const { lessonId } = req.params;
    const { title, video_url, duration, order_number } = req.body;

    try {
        // Verify lesson ownership via module and course
        const lessonCheck = await db.query(
            `SELECT l.id, cm.course_id 
             FROM lessons l
             JOIN course_modules cm ON l.module_id = cm.id
             JOIN courses c ON cm.course_id = c.id
             WHERE l.id = $1 AND c.instructor_id = $2`,
            [lessonId, instructorId]
        );

        if (lessonCheck.rows.length === 0) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const result = await db.query(
            `UPDATE lessons 
             SET title = COALESCE($1, title),
                 video_url = COALESCE($2, video_url),
                 duration = COALESCE($3, duration),
                 order_number = COALESCE($4, order_number)
             WHERE id = $5 
             RETURNING *`,
            [title, video_url, duration, order_number, lessonId]
        );

        // Reset course approval
        await db.query(
            `UPDATE courses SET approval_status = 'pending' 
             WHERE id = $1 AND approval_status = 'approved'`,
            [lessonCheck.rows[0].course_id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Failed to update lesson", error: err.message });
    }
};

const deleteLesson = async (req, res) => {
    const instructorId = req.user.userId;
    const { lessonId } = req.params;

    try {
        // Verify lesson ownership via module and course
        const lessonCheck = await db.query(
            `SELECT l.id, cm.course_id 
             FROM lessons l
             JOIN course_modules cm ON l.module_id = cm.id
             JOIN courses c ON cm.course_id = c.id
             WHERE l.id = $1 AND c.instructor_id = $2`,
            [lessonId, instructorId]
        );

        if (lessonCheck.rows.length === 0) {
            return res.status(403).json({ message: "Not authorized" });
        }

        await db.query(`DELETE FROM lessons WHERE id = $1`, [lessonId]);

        // Reset course approval
        await db.query(
            `UPDATE courses SET approval_status = 'pending' 
             WHERE id = $1 AND approval_status = 'approved'`,
            [lessonCheck.rows[0].course_id]
        );

        res.json({ message: "Lesson deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete lesson", error: err.message });
    }
};

export { createLesson, getModuleLessons, updateLesson, deleteLesson };
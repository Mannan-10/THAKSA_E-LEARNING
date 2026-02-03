import db from "../config/db.js";

const createLesson = async (req, res) => {
    const instructorId = req.user.userId;
    const { moduleId } = req.params;
    const { title, video_url, duration, order_number } = req.body;

    // 1. Verify module ownership via course
    const moduleCheck = await db.query(
        `SELECT cm.id, c.id AS course_id FROM course_modules cm JOIN courses c ON cm.course_id = c.id WHERE cm.id = $1 AND c.instructor_id = $2`,[moduleId, instructorId]
    );

    if (moduleCheck.rows.length === 0) {
        return res.status(403).json({ message: "Not allowed" });
    }

    // 2. Insert lesson
    const result = await db.query(
        `INSERT INTO lessons (module_id, title, video_url, duration, order_number) VALUES ($1, $2, $3, $4, $5) RETURNING *`,[moduleId, title, video_url, duration, order_number]
    );

    // 3. Reset course approval
    await db.query(
        `UPDATE courses SET approval_status = 'pending' WHERE id = $1 AND approval_status = 'approved'`,[moduleCheck.rows[0].course_id]
    );

    res.status(201).json(result.rows[0]);
}

const getModuleLessons = async (req, res) => {
    const {moduleId} = req.params;

    const result = await db.query(
        `SELECT * FROM lessons WHERE module_id = $1 ORDER BY order_number`,[moduleId]
    );

    res.json(result.rows);
}

export {createLesson, getModuleLessons};
import db from '../config/db.js';

const createModule = async (req, res) => {
    const instructorId = req.user.userId;

    const { courseId } = req.params;

    const { title, order_number } = req.body;

    try {
        // 1. Check course ownership
        const course = await db.query(
            `SELECT * FROM courses WHERE id = $1 AND instructor_id = $2`, [courseId, instructorId]
        )

        if (course.rows.length === 0) {
            return res.status(403).json({ message: "Not authorized" })
        }

        // 2. Insert module
        const result = await db.query(
            `INSERT INTO course_modules (course_id, title, order_number) VALUES ($1, $2, $3) RETURNING *`, [courseId, title, order_number]
        );

        // 3. Reset approvals if needed
        await db.query(
            `UPDATE courses SET approval_status = 'pending' WHERE id = $1 AND approval_status = 'approved'`, [courseId]
        );

        console.log(result.rows[0]);


        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(403).json({ message: "getting error while inserting.", err })
    }
};

const getCourseModules = async (req, res) => {
    const { courseId } = req.params;

    const result = await db.query(
        `SELECT * FROM course_modules WHERE course_id = $1 ORDER BY order_number`, [courseId]
    );

    res.json(result.rows);
}

const updateModule = async (req, res) => {
    const instructorId = req.user.userId;
    const { moduleId } = req.params;
    const { title, order_number } = req.body;

    try {
        // Verify module ownership via course
        const moduleCheck = await db.query(
            `SELECT cm.id, cm.course_id FROM course_modules cm 
             JOIN courses c ON cm.course_id = c.id 
             WHERE cm.id = $1 AND c.instructor_id = $2`,
            [moduleId, instructorId]
        );

        if (moduleCheck.rows.length === 0) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const result = await db.query(
            `UPDATE course_modules 
             SET title = COALESCE($1, title), 
                 order_number = COALESCE($2, order_number) 
             WHERE id = $3 
             RETURNING *`,
            [title, order_number, moduleId]
        );

        // Reset course approval
        await db.query(
            `UPDATE courses SET approval_status = 'pending' 
             WHERE id = $1 AND approval_status = 'approved'`,
            [moduleCheck.rows[0].course_id]
        );

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Failed to update module", error: err.message });
    }
};

const deleteModule = async (req, res) => {
    const instructorId = req.user.userId;
    const { moduleId } = req.params;

    try {
        // Verify module ownership via course
        const moduleCheck = await db.query(
            `SELECT cm.id, cm.course_id FROM course_modules cm 
             JOIN courses c ON cm.course_id = c.id 
             WHERE cm.id = $1 AND c.instructor_id = $2`,
            [moduleId, instructorId]
        );

        if (moduleCheck.rows.length === 0) {
            return res.status(403).json({ message: "Not authorized" });
        }

        // Delete module (cascade will delete lessons if configured in DB)
        await db.query(`DELETE FROM course_modules WHERE id = $1`, [moduleId]);

        // Reset course approval
        await db.query(
            `UPDATE courses SET approval_status = 'pending' 
             WHERE id = $1 AND approval_status = 'approved'`,
            [moduleCheck.rows[0].course_id]
        );

        res.json({ message: "Module deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete module", error: err.message });
    }
};

export { createModule, getCourseModules, updateModule, deleteModule };
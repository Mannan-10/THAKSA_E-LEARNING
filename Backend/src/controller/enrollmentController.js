import db from "../config/db.js";

const enrollBatch = async (req, res) => {
    const { userId } = req.user;
    const { batchId } = req.params;

    try {
        // 1. Prevent duplicate enrollment
        const existing = await db.query(
            `SELECT id FROM batch_enrollments WHERE batch_id = $1 AND user_id = $2`,[batchId, userId]
        );

        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "Already Enrolled" });
        }

        // 2. Enroll
        await db.query(
            `INSERT INTO batch_enrollments (batch_id, user_id) VALUES ($1, $2)`,[batchId, userId]
        );

        res.status(201).json({ message: "Enrolled successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const getMyEnrollments = async (req, res) => {
    const { userId } = req.user;

    const result = await db.query(
        `SELECT b.*, c.title FROM batch_enrollments be JOIN batches b ON be.batch_id = b.id JOIN courses c ON b.course_id = c.id WHERE be.user_id = $1`,[userId]
    );

    res.json(result.rows);
}

export {enrollBatch, getMyEnrollments};
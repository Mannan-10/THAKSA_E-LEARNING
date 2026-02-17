import db from "../config/db.js";

const getBatchStudents = async (req, res) => {
    const instructorId = req.user.userId;
    const { batchId } = req.params;

    try {
        const ownership = await db.query(
            `SELECT b.id FROM batches b
             JOIN courses c ON b.course_id = c.id
             WHERE b.id = $1 AND c.instructor_id = $2`,
            [batchId, instructorId]
        );

        if (ownership.rows.length === 0) {
            return res.status(403).json({ message: "Not authorized to view students for this batch" });
        }

        const result = await db.query(
            `SELECT u.id, u.name, u.email, u.created_at,
                be.enrolled_at, be.status AS enrollment_status
             FROM batch_enrollments be
             JOIN users u ON be.user_id = u.id
             WHERE be.batch_id = $1
             ORDER BY u.name ASC`,
            [batchId]
        );

        res.json({ students: result.rows });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const removeStudentFromBatch = async (req, res) => {
    const instructorId = req.user.userId;
    const { batchId, studentId } = req.params;

    try {
        const ownership = await db.query(
            `SELECT b.id FROM batches b
             JOIN courses c ON b.course_id = c.id
             WHERE b.id = $1 AND c.instructor_id = $2`,
            [batchId, instructorId]
        );

        if (ownership.rows.length === 0) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const result = await db.query(
            `DELETE FROM batch_enrollments WHERE batch_id = $1 AND user_id = $2 RETURNING id`,
            [batchId, studentId]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: "Student not found in this batch" });
        }

        res.json({ message: "Student removed from batch successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { getBatchStudents, removeStudentFromBatch };

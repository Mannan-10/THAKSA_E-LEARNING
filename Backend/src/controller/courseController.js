import db from "../config/db.js";

const getApprovedCourses = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT * FROM courses WHERE approval_status = 'approved' AND is_active = true`
        );
        res.json(result.rows)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export {getApprovedCourses};
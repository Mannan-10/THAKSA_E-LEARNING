import db from "../config/db.js";

const getPendingCourses = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT c.*, u.name AS instructor_name FROM courses c JOIN users u ON c.instructor_id = u.id WHERE approval_status = 'pending'`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
};

const approveCourse = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            `UPDATE courses SET approval_status = 'approved' WHERE id = $1`,[id]
        );
        res.json({ message: "Course approved successfully." });
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

const rejectCourse = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            `UPDATE courses SET approval_status = 'rejected' WHERE id = $1`,[id]
        );
        res.json({ message: "Course rejected" });
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
}

export { getPendingCourses, approveCourse, rejectCourse };
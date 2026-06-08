import db from "../config/db.js";

const getAllUsers = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC"
        );

        res.status(200).json({ users: result.rows });
    } catch (err) {
        res.status(500).json({ message: "Error fetching users: " + err.message });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;

    const result = await db.query(
        `SELECT u.id, u.name, u.email, u.role, u.created_at, p.phone, p.bio, p.profile_image, p.date_of_birth FROM users u LEFT JOIN user_profiles p ON p.user_id = u.id WHERE u.id = $1`, [id]
    );

    if (result.rows.length === 0) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
}

const updateUserRole = async (req, res) => {
    const {id} = req.params;
    const {role} = req.body;

    const allowedRoles = ["student", "instructor", "admin"];

    if (!allowedRoles.includes(role)) {
        return res.status(400).json({message: "Invalid role specified"});
    }

    const result = await db.query(
        "UPDATE users SET role = $1 WHERE id = $2 RETURNING id, role",[role, id]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({message: "User not found"});
    }
    res.json({message: "User role updated successfully", user: result.rows[0]});
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    const result = await db.query(
        "DELETE FROM users WHERE id = $1 RETURNING id", [id]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully", userId: result.rows[0].id });
}

const getAllBatchesAdmin = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT b.*, c.title AS course_title, u.name AS instructor_name,
                COALESCE(be.enrolled_count, 0) AS enrolled_count
             FROM batches b
             JOIN courses c ON b.course_id = c.id
             JOIN users u ON c.instructor_id = u.id
             LEFT JOIN (
                SELECT batch_id, COUNT(*)::int AS enrolled_count
                FROM batch_enrollments
                GROUP BY batch_id
             ) be ON be.batch_id = b.id
             ORDER BY b.start_date DESC`
        );

        res.json({ batches: result.rows });
    } catch (err) {
        res.status(500).json({ message: "Error fetching batches: " + err.message });
    }
};

export { getAllUsers, getUserById, updateUserRole, deleteUser, getAllBatchesAdmin };
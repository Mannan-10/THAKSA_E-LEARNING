import db from "../config/db.js";
import generateCertificate from "../utils/generateCertificate.js";


const generateCourseCertificate = async (req, res) => {
    const userId = req.user.userId;
    const {courseId} = req.params;
    
    try {
        // Check existing Certificate
        const existing = await db.query(
            `SELECT id FROM certificates WHERE user_id = $1 AND course_id = $2`,[userId, courseId]
        );

        if (existing.rows.length > 0) {
            return res.status(400).json({ message: "Certificate already issued" });
        }

        // Get Progress
        const progress = await db.query(
            `SELECT COUNT(lp.id) FILTER (WHERE lp.completed) AS completed,
            COUNT(l.id) AS total
            FROM lessons l
            JOIN course_modules cm ON l.module_id = cm.id
            LEFT JOIN lesson_progress lp
                ON lp.lesson_id = l.id AND lp.user_id = $1
            WHERE cm.course_id = $2`,[userId, courseId]
        );

        const { completed, total } = progress.rows[0];

        if (total === 0 || completed !== total) {
            return res.status(400).json({ message: "Course not fully completed"})
        };

        // Generate certificate file
        const certificateUrl = await generateCertificate(userId, courseId);

        const result = await db.query(
            `INSERT INTO certificates (user_id, course_id, certificate_url) VALUES ($1, $2, $3) RETURNING *`,[userId, courseId, certificateUrl]
        )

        res.status(201).json({ message: "Certificate generated successfully", certificate: result.rows[0]})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const getMyCertificates = async (req, res) => {
    const userId = req.user.userId;

    const result = await db.query(
        `SELECT c.*, co.title AS course
        FROM certificates c
        JOIN courses co ON c.course_id = co.id
        WHERE c.user_id = $1`,[userId]
    );

    res.json(result.rows);
}

const getAllCertificates = async (req, res) => {
    const result = await db.query(
        `SELECT c.*, u.name, co.title AS course
        FROM certificates c
        JOIN users u ON c.user_id = u.id
        JOIN courses co ON c.course_id = co.id
        ORDER BY c.issued_at DESC`
    );

    res.json(result.rows);
};

export {
    generateCourseCertificate,
    getMyCertificates,
    getAllCertificates
}

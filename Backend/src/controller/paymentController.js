import db from "../config/db.js"

const makePayment = async (req, res) => {
    const { userId } = req.user;
    const { batchId, amount, payment_method } = req.body;

    try {
        const existingPayment = await db.query(
            `SELECT id FROM payments WHERE user_id = $1 AND batch_id = $2`,[userId, batchId]
        )

        if (existingPayment.rows.length > 0) {
            return res.status(400).json({ message: "Payment already done" });
        }

        // Insert Payment
        const payment = await db.query(
            `INSERT INTO payments (user_id, batch_id, amount, payment_method, payment_status, transaction_id) VALUES ($1, $2, $3, $4, 'SUCCESS', $5) RETURNING *`,[userId, batchId, amount, payment_method, `TXN_${Date.now()}`]
        );

        // Auto-enroll student
        await db.query(
            `INSERT INTO batch_enrollments (batch_id, user_id) VALUES ($1, $2)`,[batchId, userId]
        );

        res.status(201).json({ message: "Payment Successful & enrolled", payment: payment.rows[0]})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const getMyPayments = async (req, res) => {
    const { userId } = req.user;

    const result = await db.query(
        `SELECT p.*, b.batch_name c.title AS course FROM payments p JOIN batches b ON p.batch_id = b.id JOIN courses c ON b.course_id = c.id WHERE p.user_id = $1`,[userId]
    );
    res.json(result.rows);
}

const getInstructorPayments = async (req, res) => {
    const instructorId = req.user.userId;

    const result = await db.query(
        `SELECT p.*, u.name AS student, c.title AS course FROM payments p JOIN users u ON p.user_id = u.id JOIN batches b ON p.batch_id = b.id JOIN courses c ON b.course_id = c.id WHERE c.instructor_id = $1`,[instructorId]
    )

    res.json(result.rows);
}

const getAllPayments = async (req, res) => {
    const result = await db.query(
        `SELECT p.*, u.name AS student, c.title AS course FROM payments p JOIN users u ON p.user_id = u.id JOIN batches b ON p.batch_id = b.id JOIN courses c ON b.course_id = c.id ORDER BY p.paid_at DESC`
    )

    res.json(result.rows);
}

export {makePayment, getMyPayments, getInstructorPayments, getAllPayments};
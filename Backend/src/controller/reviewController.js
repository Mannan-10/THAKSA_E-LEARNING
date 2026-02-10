import db from "../config/db.js";

const addReview = async (req, res) => {
    const { userId } = req.user;
    const { courseId } = req.params;
    const { rating, comment } = req.body;

    try {
        if (!rating) {
            return res.status(400).json({ message: "Rating is required" });
        }

        // Check enrollment via batches
        const enrollmentCheck = await db.query(
            `SELECT be.id FROM batch_enrollment be
            JOIN batches b ON be.batch_id = b.id
            JOIN courses c ON b.course_id = c.id
            WHERE be.user_id = $1 AND b.course_id = $2
            AND be.status = true`,[userId, courseId]
        );

        if (enrollmentCheck.rows.length === 0) {
            return res.status(403).json({ message: "Not enrolled in this course" });
        }

        const existingReview = await db.query(
            `SELECT id FROM reviews WHERE user_id = $1 AND course_id = $2`,[userId, courseId]
        );

        if (existingReview.rows.length > 0) {
            return res.status(400).json({ message: "Review already submitted" });
        }

        // Insert Review
        const result = await db.query(
            `INSERT INTO reviews (user_id, course_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *`,[userId, courseId, rating, comment]
        );

        res.status(201).json({ message: "Review submitted successfully", review: result.rows[0]})
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

const getCourseReviews = async (req, res) => {
    const { courseId } = req.params;

    const result = await db.query(
        `SELECT
            r.id,
            r.rating,
            r.comment,
            r.created_at,
            u.name AS student_name
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.course_id = $1
        ORDER BY r.created_at DESC`,[courseId]
    );

    res.json(result.rows);
}

const getCourseRatingSummary = async (req, res) => {
    const { courseId } = req.params;

    const result = await db.query(
        `SELECT
            COUNT(*) AS total_reviews,
            ROUND(AVG(rating), 1) AS average_rating
        FROM reviews
        WHERE course_id = $1`,[courseId]
    );

    res.status(200).json(result.rows[0])
}

const updateReview = async (req, res) => {
    const { userId } = req.user;
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const result = await db.query(
        `UPDATE reviews
        SET rating = $1, comment = $2
        WHERE id = $3 AND user_id = $4
        RETURNING *`,[rating, comment, reviewId, userId]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review updated successfully", review: result.rows[0]});
}

const deleteReview = async (req, res) => {
    const { userId } = req.user;
    const { reviewId } = req.params;
    const result = await db.query(
        `DELETE FROM reviews WHERE id = $1 AND user_id = $2 RETURNING id`,
        [reviewId, userId]
    );

    if (result.rowCount === 0) {
        return res.status(404).json({ message: "Review not found or unauthorized" });
    }

    res.json({ message: "Review deleted successfully" });
};

export {
    addReview,
    getCourseReviews,
    getCourseRatingSummary,
    updateReview,
    deleteReview
}

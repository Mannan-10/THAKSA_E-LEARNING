import db from "../config/db.js";


const createBatch = async (req, res) => {
    const instructorId = req.user.userId;
    const { courseId } = req.params;
    const { batch_name, start_data, end_date, schedule, max_students } = req.body;

    try {
        // 1. Verify Instructor owns course
        const course = await db.query(
            `SELECT id FROM courses WHERE id = $1 AND instructor_id = $2`,[courseId, instructorId]
        );

        if (course.rows.length === 0) {
            return res.status(403).json({ message: "Not authorized" })
        }

        // 2. Create Batch
        const result = await db.query(
            `INSERT INTO batches (course_id, batch_name, start_date, end_date, schedule, max_students) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,[courseId, batch_name, start_data, end_date, schedule, max_students]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getInstructorBatches = async (req, res) => {
    const instructorId = req.user.userId;

    const result = await db.query(
        `SELECT b.* FROM batches b JOIN courses c ON b.course_id = c.id WHERE c.instructor_id = $1`,[instructorId]
    );
    
    res.json(result.rows);
}

export {createBatch, getInstructorBatches};
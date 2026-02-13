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

const getMyBatch = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await db.query(
      `
     SELECT 
        b.id,
        b.batch_name,
        b.course_id,
        b.start_date,
        b.end_date,
        b.schedule,
        b.max_students,
        c.title AS course_title,
        u.name AS instructor_name,
        u.email AS instructor_email
      FROM batch_enrollments be
      JOIN batches b ON be.batch_id = b.id
      JOIN courses c ON b.course_id = c.id
      JOIN users u ON c.instructor_id = u.id
      WHERE be.user_id = $1
      `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No batch assigned" });
    }

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyBatches = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await db.query(
      `
      SELECT 
        b.id AS batch_id,
        b.batch_name,
        b.start_date,
        b.end_date,
        b.schedule,

        c.id AS course_id,
        c.title AS course_title,

        u.name AS instructor_name

      FROM batch_enrollments be
      JOIN batches b ON b.id = be.batch_id
      JOIN courses c ON c.id = b.course_id
      JOIN users u ON u.id = c.instructor_id

      WHERE be.user_id = $1

      ORDER BY b.start_date DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAvailableBatches = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        b.id AS batch_id,
        b.batch_name,
        b.start_date,
        b.end_date,
        b.schedule,
        b.max_students,

        c.title AS course_title,
        c.price,

        u.name AS instructor_name,

        COUNT(be.id) AS enrolled_students

      FROM batches b
      JOIN courses c ON c.id = b.course_id
      JOIN users u ON u.id = c.instructor_id
      LEFT JOIN batch_enrollments be ON be.batch_id = b.id

      WHERE c.approval_status = 'approved'
        AND c.is_active = true

      GROUP BY b.id, c.id, u.id
      ORDER BY b.start_date ASC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export {createBatch, getInstructorBatches, getMyBatch, getMyBatches, getAvailableBatches};
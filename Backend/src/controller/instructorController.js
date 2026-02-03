import db from "../config/db.js";

const createCourse = async (req, res) => {
  const { title, description, price, level } = req.body;

  const instructorId = req.user.userId;

  try {
    const result = await db.query(
      `INSERT INTO courses (title, description, price, level, instructor_id, is_active) VALUES ($1, $2, $3, $4, $5, false) RETURNING *`,
      [title, description, price, level, instructorId]
    );

    res
      .status(201)
      .json({
        message: "Course created successfully and sent for admin approval.",
        course: result.rows[0]
      });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getMyCourses = async (req, res) => {
  const userId = req.user.userId;
  
  const result = await db.query(
    `SELECT * FROM courses WHERE instructor_id = $1`,
    [userId],
  );

  res.status(200).json(result.rows[0]);
};

export { createCourse, getMyCourses };

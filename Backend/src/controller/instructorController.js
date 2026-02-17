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
    `SELECT * FROM courses WHERE instructor_id = $1 ORDER BY created_at DESC`,
    [userId],
  );

  res.status(200).json(result.rows);
};

const toggleCourseActive = async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;
  const instructorId = req.user.userId;

  try {
    // Verify course belongs to this instructor
    const courseCheck = await db.query(
      `SELECT * FROM courses WHERE id = $1 AND instructor_id = $2`,
      [id, instructorId]
    );

    if (courseCheck.rows.length === 0) {
      return res.status(403).json({ message: "Not authorized to modify this course" });
    }

    // Update is_active status
    await db.query(
      `UPDATE courses SET is_active = $1 WHERE id = $2`,
      [is_active, id]
    );

    res.json({ message: `Course ${is_active ? 'activated' : 'deactivated'} successfully` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { createCourse, getMyCourses, toggleCourseActive };

import db from "../config/db.js";

const getInstructorDashboardStats = async (req, res) => {
  const instructorId = req.user.userId;

  try {
    // 1. Total Courses created by instructor
    const totalCourses = await db.query(
      "SELECT COUNT(*) FROM courses WHERE instructor_id = $1",
      [instructorId]
    );

    // 2. Total Students enrolled in instructor's courses
    const totalStudents = await db.query(
      `SELECT COUNT(DISTINCT be.user_id) 
       FROM batch_enrollments be 
       JOIN batches b ON be.batch_id = b.id 
       JOIN courses c ON b.course_id = c.id 
       WHERE c.instructor_id = $1`,
      [instructorId]
    );

    // 3. Total Revenue from instructor's courses
    const totalRevenue = await db.query(
      `SELECT COALESCE(SUM(p.amount), 0) as revenue
       FROM payments p
       JOIN batches b ON p.batch_id = b.id
       JOIN courses c ON b.course_id = c.id
       WHERE c.instructor_id = $1 AND LOWER(p.payment_status) = 'success'`,
      [instructorId]
    );

    // 4. Course-wise performance (Enrollments and Rating)
    const courseStats = await db.query(
      `SELECT 
        c.id, 
        c.title, 
        c.approval_status,
        COUNT(DISTINCT be.id) as enrollment_count,
        COALESCE(AVG(r.rating), 0) as avg_rating
       FROM courses c
       LEFT JOIN batches b ON c.id = b.course_id
       LEFT JOIN batch_enrollments be ON b.id = be.batch_id
       LEFT JOIN reviews r ON c.id = r.course_id
       WHERE c.instructor_id = $1
       GROUP BY c.id`,
      [instructorId]
    );

    res.json({
      stats: {
        totalCourses: totalCourses.rows[0].count,
        totalStudents: totalStudents.rows[0].count,
        totalRevenue: totalRevenue.rows[0].revenue,
      },
      courseStats: courseStats.rows,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export { getInstructorDashboardStats };

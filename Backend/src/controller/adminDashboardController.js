import db from "../config/db.js";

const getAdminDashboardStats = async (req, res) => {
  try {
    const totalUsers = await db.query("SELECT COUNT(*) FROM users");

    const totalStudents = await db.query(
      "SELECT COUNT(*) FROM users WHERE role = 'student'",
    );

    const totalInstructors = await db.query(
      "SELECT COUNT(*) FROM users WHERE role = 'instructor'",
    );

    const totalCourses = await db.query("SELECT COUNT(*) FROM courses");

    const pendingCourses = await db.query(
      "SELECT COUNT(*) FROM courses WHERE approval_status = 'pending'",
    );

    const approvedCourses = await db.query(
      "SELECT COUNT(*) FROM courses WHERE approval_status = 'approved'",
    );

    const totalEnrollments = await db.query(
      "SELECT COUNT(*) FROM batch_enrollments",
    );

    const totalRevenue = await db.query(
      "SELECT COALESCE(SUM(amount), 0) FROM payments WHERE payment_status = 'success'",
    );

    res.json({
      users: {
        total: totalUsers.rows[0].count,
        students: totalStudents.rows[0].count,
        instructors: totalInstructors.rows[0].count,
      },
      courses: {
        total: totalCourses.rows[0].count,
        pending: pendingCourses.rows[0].count,
        approved: approvedCourses.rows[0].count,
      },
      enrollments: totalEnrollments.rows[0].count,
      revenue: totalRevenue.rows[0].coalesce,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {getAdminDashboardStats};
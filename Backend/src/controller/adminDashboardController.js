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

    const columnCheck = await db.query(
      `SELECT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_name = 'courses' AND column_name = 'approval_status'
      ) AS has_approval_status`,
    );

    const hasApprovalStatus = columnCheck.rows[0]?.has_approval_status;

    const pendingCourses = hasApprovalStatus
      ? await db.query(
          "SELECT COUNT(*) FROM courses WHERE LOWER(approval_status) = 'pending'",
        )
      : { rows: [{ count: "0" }] };

    const approvedCourses = hasApprovalStatus
      ? await db.query(
          "SELECT COUNT(*) FROM courses WHERE LOWER(approval_status) = 'approved'",
        )
      : { rows: [{ count: "0" }] };

    const totalEnrollments = await db.query(
      "SELECT COUNT(*) FROM batch_enrollments",
    );

    const totalRevenue = await db.query(
      "SELECT COALESCE(SUM(amount), 0) AS revenue FROM payments WHERE LOWER(payment_status) = 'success'",
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
      revenue: totalRevenue.rows[0].revenue,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {getAdminDashboardStats};

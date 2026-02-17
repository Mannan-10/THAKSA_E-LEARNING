import db from "../config/db.js";

const markAttendance = async (req, res) => {
  const { userId } = req.user;
  const { sessionId } = req.params;

  try {
    const session = await db.query(
      `SELECT ls.id, ls.status, ls.batch_id
       FROM live_sessions ls
       JOIN batch_enrollments be ON be.batch_id = ls.batch_id
       WHERE ls.id = $1 AND be.user_id = $2 AND be.status = true`,
      [sessionId, userId]
    );

    if (session.rows.length === 0) {
      return res.status(403).json({ message: "You are not enrolled in this session's batch" });
    }

    if (session.rows[0].status !== "live") {
      return res.status(409).json({ message: "Attendance can only be marked when the session is live" });
    }

    const result = await db.query(
      `INSERT INTO session_attendance (session_id, user_id)
       VALUES ($1, $2)
       ON CONFLICT (session_id, user_id) DO NOTHING
       RETURNING *`,
      [sessionId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(200).json({ message: "Attendance already marked" });
    }

    return res.status(201).json({ message: "Attendance marked successfully", attendance: result.rows[0] });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getMyAttendance = async (req, res) => {
  const { userId } = req.user;

  try {
    const result = await db.query(
      `SELECT
         ls.id AS session_id, ls.title AS session_title, ls.scheduled_at,
         ls.duration_minutes, ls.status AS session_status,
         c.id AS course_id, c.title AS course_title,
         b.id AS batch_id, b.batch_name,
         sa.id AS attendance_id, sa.marked_at,
         CASE
           WHEN sa.id IS NOT NULL THEN 'Present'
           WHEN ls.status = 'completed' THEN 'Absent'
           WHEN ls.status = 'cancelled' THEN 'Cancelled'
           ELSE 'Upcoming'
         END AS attendance_status
       FROM live_sessions ls
       JOIN batches b ON ls.batch_id = b.id
       JOIN courses c ON b.course_id = c.id
       JOIN batch_enrollments be ON be.batch_id = b.id
       LEFT JOIN session_attendance sa ON sa.session_id = ls.id AND sa.user_id = $1
       WHERE be.user_id = $1 AND be.status = true
       ORDER BY ls.scheduled_at DESC`,
      [userId]
    );

    const records = result.rows;
    const presentCount = records.filter(r => r.attendance_status === "Present").length;
    const absentCount = records.filter(r => r.attendance_status === "Absent").length;
    const totalFinalized = presentCount + absentCount;
    const attendanceRate = totalFinalized > 0 ? Math.round((presentCount / totalFinalized) * 100) : 0;

    return res.json({
      records,
      stats: {
        totalSessions: records.length,
        completedSessions: totalFinalized,
        present: presentCount,
        absent: absentCount,
        attendanceRate,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSessionAttendance = async (req, res) => {
  const { sessionId } = req.params;
  const instructorId = req.user.userId;

  try {
    // specific check: ensure the session belongs to a batch the instructor owns
    const sessionCheck = await db.query(
      `SELECT ls.id
       FROM live_sessions ls
       JOIN batches b ON ls.batch_id = b.id
       JOIN courses c ON b.course_id = c.id
       WHERE ls.id = $1 AND c.instructor_id = $2`,
      [sessionId, instructorId]
    );

    if (sessionCheck.rows.length === 0) {
      return res.status(403).json({ message: "Not authorized to view attendance for this session" });
    }

    const result = await db.query(
      `SELECT
         u.id AS student_id,
         u.name,
         u.email,
         CASE WHEN sa.id IS NOT NULL THEN true ELSE false END AS is_present,
         sa.marked_at
       FROM live_sessions ls
       JOIN batch_enrollments be ON be.batch_id = ls.batch_id
       JOIN users u ON be.user_id = u.id
       LEFT JOIN session_attendance sa ON sa.session_id = ls.id AND sa.user_id = u.id
       WHERE ls.id = $1 AND be.status = true
       ORDER BY u.name`,
      [sessionId]
    );

    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAttendance = async (req, res) => {
  const { sessionId } = req.params;
  const { studentId, status } = req.body; // status: 'present' | 'absent'
  const instructorId = req.user.userId;

  try {
    // Authorization check
    const sessionCheck = await db.query(
      `SELECT ls.id
       FROM live_sessions ls
       JOIN batches b ON ls.batch_id = b.id
       JOIN courses c ON b.course_id = c.id
       WHERE ls.id = $1 AND c.instructor_id = $2`,
      [sessionId, instructorId]
    );

    if (sessionCheck.rows.length === 0) {
      return res.status(403).json({ message: "Not authorized to update attendance for this session" });
    }

    if (status === "present") {
      await db.query(
        `INSERT INTO session_attendance (session_id, user_id)
         VALUES ($1, $2)
         ON CONFLICT (session_id, user_id) DO NOTHING`,
        [sessionId, studentId]
      );
    } else if (status === "absent") {
      await db.query(
        `DELETE FROM session_attendance
         WHERE session_id = $1 AND user_id = $2`,
        [sessionId, studentId]
      );
    } else {
      return res.status(400).json({ message: "Invalid status. Use 'present' or 'absent'" });
    }

    return res.json({ message: "Attendance updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBatchAttendance = async (req, res) => {
  const { batchId } = req.params;
  const instructorId = req.user.userId;

  try {
    // Verify batch ownership
    const batchCheck = await db.query(
      `SELECT b.id FROM batches b
       JOIN courses c ON b.course_id = c.id
       WHERE b.id = $1 AND c.instructor_id = $2`,
      [batchId, instructorId]
    );

    if (batchCheck.rows.length === 0) {
      return res.status(403).json({ message: "Not authorized to view this batch's attendance" });
    }

    // Get comprehensive attendance data
    const result = await db.query(
      `SELECT
         u.id AS student_id,
         u.name,
         u.email,
         COUNT(DISTINCT ls.id) FILTER (WHERE ls.status IN ('completed', 'live')) AS total_sessions,
         COUNT(DISTINCT sa.session_id) AS attended_sessions,
         CASE 
           WHEN COUNT(DISTINCT ls.id) FILTER (WHERE ls.status IN ('completed', 'live')) > 0 
           THEN ROUND((COUNT(DISTINCT sa.session_id)::numeric / COUNT(DISTINCT ls.id) FILTER (WHERE ls.status IN ('completed', 'live'))::numeric) * 100, 2)
           ELSE 0
         END AS attendance_percentage,
         MAX(sa.marked_at) AS last_attendance
       FROM batch_enrollments be
       JOIN users u ON be.user_id = u.id
       LEFT JOIN live_sessions ls ON ls.batch_id = be.batch_id AND ls.status IN ('completed', 'live')
       LEFT JOIN session_attendance sa ON sa.session_id = ls.id AND sa.user_id = u.id
       WHERE be.batch_id = $1 AND be.status = true
       GROUP BY u.id, u.name, u.email
       ORDER BY u.name`,
      [batchId]
    );

    return res.json(result.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { markAttendance, getMyAttendance, getSessionAttendance, updateAttendance, getBatchAttendance };

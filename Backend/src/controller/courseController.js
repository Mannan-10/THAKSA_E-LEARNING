import db from "../config/db.js";

const getApprovedCourses = async (req, res) => {
  try {
    const result = await db.query(
      `
        SELECT 
            c.id,
            c.title,
            c.description,
            c.price,
            c.level,
            c.created_at,
            u.name AS instructor_name
        FROM courses c
        JOIN users u ON c.instructor_id = u.id
        WHERE c.approval_status = 'approved'
        AND c.is_active = true
        ORDER BY c.created_at DESC
        `,
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPublicCourses = async (req, res) => {
  try {
    const { search = "", level, page = 1, limit = 6 } = req.query;
    const offset = (page - 1) * limit;
    let values = [];
    let count = 1;

    let baseQuery = `
            FROM courses c
            JOIN users u ON c.instructor_id = u.id
            WHERE c.is_active = true
        `;

    if (search) {
      baseQuery += `AND c.title ILIKE $${count}`;
      values.push(`%${search}%`);
      count++;
    }

    if (level) {
      baseQuery += `AND c.level = $${count}`;
      values.push(level);
      count++;
    }

    const totalResult = await db.query(`SELECT COUNT(*) ${baseQuery}`, values);

    const totalCourses = parseInt(totalResult.rows[0].count);

    const coursesQuery = `
            SELECT 
                c.id,
                c.title,
                c.description,
                c.price,
                c.level,
                c.created_at,
                u.name AS instructor_name
            ${baseQuery}
            ORDER BY c.created_at DESC
            LIMIT $${count} OFFSET $${count + 1}
            `;

    const coursesResult = await db.query(coursesQuery, [
      ...values,
      limit,
      offset,
    ]);

    res.status(200).json({
      totalCourses,
      totalPages: Math.ceil(totalCourses / limit),
      currentPage: parseInt(page),
      courses: coursesResult.rows,
    });
  } catch (error) {
    console.error("Error fetching public courses:", error);
    res.status(500).json({ message: "Failed to fetch public courses" });
  }
};

const getMyCoursesWithProgress = async (req, res) => {
  const userId = req.user.userId;

  try {
    const result = await db.query(
      `
      SELECT 
        c.id,
        c.title,
        c.price,
        c.level,

        COUNT(DISTINCT l.id) AS total_lessons,

        COUNT(DISTINCT lp.id) FILTER (WHERE lp.completed = true) 
          AS completed_lessons,

        COALESCE(
          ROUND(
            (
              COUNT(DISTINCT lp.id) FILTER (WHERE lp.completed = true)::decimal 
              /
              NULLIF(COUNT(DISTINCT l.id), 0)
            ) * 100
          ),
          0
        ) AS percentage

      FROM courses c

      JOIN batches b 
        ON b.course_id = c.id

      JOIN batch_enrollments be 
        ON be.batch_id = b.id
        AND be.user_id = $1

      JOIN course_modules cm 
        ON cm.course_id = c.id

      JOIN lessons l 
        ON l.module_id = cm.id

      LEFT JOIN lesson_progress lp 
        ON lp.lesson_id = l.id 
        AND lp.user_id = $1

      WHERE c.approval_status = 'approved'
        AND c.is_active = true

      GROUP BY c.id

      ORDER BY c.created_at DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export { getApprovedCourses, getPublicCourses, getMyCoursesWithProgress };

import db from "../config/db.js";

const getApprovedCourses = async (req, res) => {
    try {
        const result = await db.query(
            `SELECT c.*, u.name AS instructor_name
             FROM courses c
             JOIN users u ON c.instructor_id = u.id
             WHERE c.approval_status = 'approved' AND c.is_active = true
             ORDER BY c.created_at DESC`
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPublicCourses = async (req, res) => {
    try {
        const { search = "", level, page = 1, limit = 6 } = req.query;
        const parsedPage = Number(page);
        const parsedLimit = Number(limit);
        const offset = (parsedPage - 1) * parsedLimit;

        const values = [];
        let index = 1;

        let filterQuery = "";

        if (search) {
            filterQuery += ` AND c.title ILIKE $${index}`;
            values.push(`%${search}%`);
            index++;
        }

        if (level) {
            filterQuery += ` AND c.level = $${index}`;
            values.push(level);
            index++;
        }

        const countQuery = `
            SELECT COUNT(*) 
            FROM courses c
            JOIN users u ON c.instructor_id = u.id
            WHERE c.is_active = true AND c.approval_status = 'approved'
            ${filterQuery}
        `;

        const totalResult = await db.query(countQuery, values);
        const totalCourses = Number(totalResult.rows[0].count || 0);

        const listQuery = `
            SELECT 
                c.id, 
                c.title, 
                c.description, 
                c.price, 
                c.level, 
                c.created_at, 
                u.name AS instructor_name,
                COALESCE(ROUND(AVG(r.rating), 1), 0) AS average_rating,
                COALESCE(COUNT(r.id), 0) AS review_count
            FROM courses c
            JOIN users u ON c.instructor_id = u.id
            LEFT JOIN reviews r ON c.id = r.course_id
            WHERE c.is_active = true AND c.approval_status = 'approved'
            ${filterQuery}
            GROUP BY c.id, u.name
            ORDER BY c.created_at DESC
            LIMIT $${index} OFFSET $${index + 1}
        `;

        const coursesResult = await db.query(listQuery, [...values, parsedLimit, offset]);

        return res.status(200).json({
            totalCourses,
            totalPages: Math.ceil(totalCourses / parsedLimit),
            currentPage: parsedPage,
            courses: coursesResult.rows,
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch public courses" });
    }
};

export { getApprovedCourses, getPublicCourses };

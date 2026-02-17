import db from "../config/db.js";
import { BATCH_STATUS, isOneOf } from "../constants/lifecycle.js";

const normalizeStatus = (value = "") => String(value).trim().toLowerCase();

const parsePagination = (page = 1, limit = 12) => {
    const parsedPage = Math.max(Number(page) || 1, 1);
    const parsedLimit = Math.min(Math.max(Number(limit) || 12, 1), 50);
    const offset = (parsedPage - 1) * parsedLimit;
    return { parsedPage, parsedLimit, offset };
};

const createBatch = async (req, res) => {
    const instructorId = req.user.userId;
    const { courseId } = req.params;
    const {
        batch_name,
        start_date,
        end_date,
        schedule,
        max_students,
        timezone,
        days_of_week,
        session_time,
        enrollment_deadline,
        status = BATCH_STATUS.UPCOMING,
    } = req.body;

    const normalizedStatus = normalizeStatus(status);
    const parsedMaxStudents =
        max_students === undefined || max_students === null || max_students === ""
            ? null
            : Number(max_students);
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);

    if (!batch_name || !start_date || !end_date) {
        return res.status(400).json({ message: "batch_name, start_date and end_date are required" });
    }

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        return res.status(400).json({ message: "start_date and end_date must be valid date values" });
    }

    if (startDate >= endDate) {
        return res.status(400).json({ message: "end_date must be greater than start_date" });
    }

    if (!isOneOf(normalizedStatus, BATCH_STATUS)) {
        return res.status(400).json({ message: "Invalid batch status" });
    }

    if (parsedMaxStudents !== null && (!Number.isInteger(parsedMaxStudents) || parsedMaxStudents <= 0)) {
        return res.status(400).json({ message: "max_students must be a positive integer" });
    }

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
            `INSERT INTO batches (
                course_id, batch_name, start_date, end_date, schedule, max_students, timezone, days_of_week, session_time, enrollment_deadline, status
            )
             VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, 'Asia/Kolkata'), $8, $9, $10, $11)
             RETURNING *`,
            [
                courseId,
                batch_name,
                start_date,
                end_date,
                schedule || null,
                parsedMaxStudents,
                timezone || null,
                days_of_week || null,
                session_time || null,
                enrollment_deadline || null,
                normalizedStatus,
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const getInstructorBatches = async (req, res) => {
    const instructorId = req.user.userId;
    try {
        const result = await db.query(
            `SELECT b.*
             FROM batches b
             JOIN courses c ON b.course_id = c.id
             WHERE c.instructor_id = $1
             ORDER BY b.start_date DESC`,
            [instructorId]
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getPublicBatches = async (req, res) => {
    try {
        const { status, courseId, page = 1, limit = 12 } = req.query;
        const normalizedStatus = status ? normalizeStatus(status) : "";
        const parsedCourseId = courseId ? Number(courseId) : null;

        if (status && !isOneOf(normalizedStatus, BATCH_STATUS)) {
            return res.status(400).json({ message: "Invalid status filter" });
        }

        if (courseId && (!Number.isInteger(parsedCourseId) || parsedCourseId <= 0)) {
            return res.status(400).json({ message: "courseId must be a positive integer" });
        }

        const { parsedPage, parsedLimit, offset } = parsePagination(page, limit);

        const values = [];
        const filters = ["c.is_active = true", "c.approval_status = 'approved'"];

        if (normalizedStatus) {
            values.push(normalizedStatus);
            filters.push(`b.status = $${values.length}`);
        }

        if (parsedCourseId) {
            values.push(parsedCourseId);
            filters.push(`b.course_id = $${values.length}`);
        }

        const whereClause = `WHERE ${filters.join(" AND ")}`;

        const totalResult = await db.query(
            `SELECT COUNT(*)::int AS total
             FROM batches b
             JOIN courses c ON b.course_id = c.id
             ${whereClause}`,
            values
        );

        const total = Number(totalResult.rows[0]?.total || 0);

        const rowsResult = await db.query(
            `SELECT
                b.id,
                b.course_id,
                b.batch_name,
                b.start_date,
                b.end_date,
                b.schedule,
                b.max_students,
                b.status,
                b.timezone,
                b.days_of_week,
                b.session_time,
                b.enrollment_deadline,
                c.title AS course_title,
                u.name AS instructor_name,
                COALESCE(be.enrolled_count, 0) AS enrolled_count,
                CASE
                    WHEN b.max_students IS NULL THEN NULL
                    ELSE GREATEST(b.max_students - COALESCE(be.enrolled_count, 0), 0)
                END AS available_seats
             FROM batches b
             JOIN courses c ON b.course_id = c.id
             JOIN users u ON c.instructor_id = u.id
             LEFT JOIN (
                SELECT batch_id, COUNT(*)::int AS enrolled_count
                FROM batch_enrollments
                GROUP BY batch_id
             ) be ON be.batch_id = b.id
             ${whereClause}
             ORDER BY b.start_date ASC
             LIMIT $${values.length + 1} OFFSET $${values.length + 2}`,
            [...values, parsedLimit, offset]
        );

        return res.status(200).json({
            batches: rowsResult.rows,
            pagination: {
                total,
                page: parsedPage,
                limit: parsedLimit,
                totalPages: Math.ceil(total / parsedLimit),
            },
        });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const getCourseBatches = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { status } = req.query;
        const normalizedStatus = status ? normalizeStatus(status) : "";
        const parsedCourseId = Number(courseId);

        if (status && !isOneOf(normalizedStatus, BATCH_STATUS)) {
            return res.status(400).json({ message: "Invalid status filter" });
        }

        if (!Number.isInteger(parsedCourseId) || parsedCourseId <= 0) {
            return res.status(400).json({ message: "Invalid courseId" });
        }

        const values = [parsedCourseId];
        const statusClause = normalizedStatus ? ` AND b.status = $2` : "";

        if (normalizedStatus) {
            values.push(normalizedStatus);
        }

        const result = await db.query(
            `SELECT
                b.id,
                b.course_id,
                b.batch_name,
                b.start_date,
                b.end_date,
                b.schedule,
                b.max_students,
                b.status,
                b.timezone,
                b.days_of_week,
                b.session_time,
                b.enrollment_deadline,
                c.title AS course_title,
                u.name AS instructor_name,
                COALESCE(be.enrolled_count, 0) AS enrolled_count,
                CASE
                    WHEN b.max_students IS NULL THEN NULL
                    ELSE GREATEST(b.max_students - COALESCE(be.enrolled_count, 0), 0)
                END AS available_seats
             FROM batches b
             JOIN courses c ON b.course_id = c.id
             JOIN users u ON c.instructor_id = u.id
             LEFT JOIN (
                SELECT batch_id, COUNT(*)::int AS enrolled_count
                FROM batch_enrollments
                GROUP BY batch_id
             ) be ON be.batch_id = b.id
             WHERE b.course_id = $1
               AND c.is_active = true
               AND c.approval_status = 'approved'
               ${statusClause}
             ORDER BY b.start_date ASC`,
            values
        );

        return res.status(200).json({ batches: result.rows });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

export { createBatch, getInstructorBatches, getPublicBatches, getCourseBatches };

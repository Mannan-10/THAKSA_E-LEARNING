import db from '../config/db.js';

const createModule = async (req, res) => {
    const instructorId = req.user.userId;
    
    const { courseId } = req.params;
    
    const { title, order_number } = req.body;

    try {   
        // 1. Check course ownership
        const course = await db.query(
            `SELECT * FROM courses WHERE id = $1 AND instructor_id = $2`,[courseId, instructorId]
        )
        
        if (course.rows.length === 0 ) {
            return res.status(403).json({ message: "Not authorized"})
        }

        // 2. Insert module
        const result = await db.query(
            `INSERT INTO course_modules (course_id, title, order_number) VALUES ($1, $2, $3) RETURNING *`,[courseId, title, order_number]
        );
        
        // 3. Reset approvals if needed
        await db.query(
            `UPDATE courses SET approval_status = 'pending' WHERE id = $1 AND approval_status = 'approved'`,[courseId]
        );

        console.log(result.rows[0]);
        
        
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(403).json({ message: "getting error while inserting.", err})
    }
};

const getCourseModules = async (req, res) => {
    const {courseId} = req.params;

    const result = await db.query(
        `SELECT * FROM course_modules WHERE course_id = $1 ORDER BY order_number`,[courseId]
    );

    res.json(result.rows);
}

export {createModule, getCourseModules};
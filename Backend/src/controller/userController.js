import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';

const register = async (req, res) => {
    try {
        const {username, email, password, role} = req.body;

        const existingUser = await db.query(
            'SELECT * FROM users WHERE email = $1;', [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({message: 'Email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await db.query(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4);',[username, email, hashedPassword, role || 'student']
        );

        res.status(201).json({message: 'User registered successfully'});
    } catch (error) {
        res.status(500).json({message: 'Error registering user: ' + error.message});
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const response = await db.query(
            'SELECT * FROM users WHERE email = $1;', [email]
        )
        const user = response.rows[0];
        if (!user) {
            return res.status(401).json({message: 'User not found'});
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({message: "Password is incorrect."});
        }

        const token = jwt.sign(
            {userId: user.id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        
        res.json({message: 'Login successful', token, user: {
            id: user.id,
            name: user.name,
            role: user.role
        }});
    } catch (error) {
        res.status(500).json({message: 'Error logging in user: ' + error.message});
    }
}

const getProfile = async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json({message: 'Error retrieving profile: ' + error.message});
    }
}

export { register, login, getProfile };
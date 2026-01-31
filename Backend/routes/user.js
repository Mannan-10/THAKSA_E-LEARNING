import express from 'express';

const userRouter = express.Router();
// Define user-related routes here

userRouter.post('/users/register', (req, res) => {
    try {
        const { username, email, password } = req.body;
        res.send(`User ${username} registered successfully`);
    } catch (error) {
        res.status(500).send('Error registering user');
    }
})

export default userRouter;
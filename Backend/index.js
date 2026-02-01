import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './src/routes/users.js';

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running..');
});

app.use('/api/users', userRouter);

app.listen(PORT ,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
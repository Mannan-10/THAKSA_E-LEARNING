import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRouter from './src/routes/users.js';
import adminRouter from './src/routes/adminRoutes.js';
import router from './src/routes/instructorRoutes.js';
import adminCourseRouter from './src/routes/adminCourseRoutes.js';
import courseRouter from './src/routes/courseRoutes.js';
import adminDashboardRoutes from './src/routes/adminDashboardRoutes.js'
import moduleRouter from './src/routes/moduleRoutes.js';
import lessonRouter from './src/routes/lessonRoutes.js';
import batchRouter from './src/routes/batchRoutes.js';
import enrollmentRouter from './src/routes/enrollmentRoutes.js';
import paymentRouter from './src/routes/paymentRoutes.js';
import lessonProgressRouter from './src/routes/lessonProgressRoutes.js';
import certificateRouter from './src/routes/certificateRoutes.js';
import reviewRouter from './src/routes/reviewRoutes.js';

dotenv.config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Server is running..');
});

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/instructor', router);
app.use('/api/admin', adminCourseRouter);
app.use('/api/courses', courseRouter);
app.use('/api/admin', adminDashboardRoutes);
app.use('/api/courses', moduleRouter);
app.use('/api/modules', lessonRouter);
app.use('/api', batchRouter);
app.use('/api', enrollmentRouter);
app.use('/api', paymentRouter);
app.use('/api', lessonProgressRouter)
app.use('/api', certificateRouter);
app.use('/api', reviewRouter);

app.listen(PORT ,() => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
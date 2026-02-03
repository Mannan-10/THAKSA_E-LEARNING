import express from 'express';
import authUser from '../middlewares/authMiddleware.js';
import allowRoles from '../middlewares/roleMiddleware.js'
import { deleteUser, getAllUsers, getUserById, updateUserRole } from '../controller/adminController.js';

const adminRouter = express.Router();

// All admin routes go here
adminRouter.use(authUser, allowRoles('admin'));

adminRouter.get('/users', getAllUsers);
adminRouter.get('/users/:id', getUserById);
adminRouter.put('/users/:id/role', updateUserRole);
adminRouter.delete('/users/:id', deleteUser);

export default adminRouter;
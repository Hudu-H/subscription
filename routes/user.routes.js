import { Router } from 'express';

// internal imports
import {
	createUser,
	deleteUser,
	getUser,
	getUsers,
	updateUser,
} from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

// create instance of userRoute
const userRouter = Router();

// get all users endpoint
userRouter.get('/', getUsers);

// get user detail endpoint
userRouter.get('/:id', authorize, getUser);

// create new user endpoint
userRouter.post('/', createUser);

// update user endpoint
userRouter.put('/:id', authorize, updateUser);

// delete user endpoint
userRouter.delete('/:id', authorize, deleteUser);

export default userRouter;

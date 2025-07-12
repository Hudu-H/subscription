import { Router } from 'express';

// internal imports
import { getUser, getUsers } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

// create instance of userRoute
const userRouter = Router();

// get all users endpoint
userRouter.get('/', getUsers);

// get user detail endpoint
userRouter.get('/:id', authorize, getUser);

// create new user endpoint
userRouter.post('/', (req, res) => res.send({ title: 'CREATE new user' }));

// update user endpoint
userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }));

// delete user endpoint
userRouter.delete('/:id', (req, res) => res.send({ title: 'GET all users' }));

export default userRouter;

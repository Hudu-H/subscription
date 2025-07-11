import { Router } from 'express';

// create instance of userRoute
const userRouter = Router();

// get all users endpoint
userRouter.get('/', (req, res) => res.send({ title: 'GET all users' }));

// get user detail endpoint
userRouter.get('/:id', (req, res) => res.send({ title: 'GET user detail' }));

// create new user endpoint
userRouter.post('/', (req, res) => res.send({ title: 'CREATE new user' }));

// update user endpoint
userRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE user' }));

// delete user endpoint
userRouter.delete('/:id', (req, res) => res.send({ title: 'GET all users' }));

export default userRouter;

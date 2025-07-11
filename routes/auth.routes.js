import { Router } from 'express';

const authRouter = Router();

// sign-up endpoints
authRouter.post('/sign-up', (req, res) => {
	res.send({ title: 'Sign Up' });
});
// sign-in endpoints
authRouter.post('/sign-in', (req, res) => {
	res.send({ title: 'Sign In' });
});
// sign-out endpoints
authRouter.post('/sign-out', (req, res) => {
	res.send({ title: 'Sign Out' });
});

export default authRouter;

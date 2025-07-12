import { Router } from 'express';

// internal imports
import { signIn, signOut, signUp } from '../controllers/auth.controller.js';

const authRouter = Router();

// sign-up endpoints path => /api/v1/auth/sign-up
authRouter.post('/sign-up', signUp);

// sign-in endpoints path => /api/v1/auth/sign-in
authRouter.post('/sign-in', signIn);

// sign-out endpoints path => /api/v1/auth/sign-out
authRouter.post('/sign-out', signOut);

export default authRouter;

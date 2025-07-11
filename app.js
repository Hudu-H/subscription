import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';

// internal imports
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabse from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

// express middlewares
app.use(express.json);
app.use(urlencoded({ extended: false }));
app.use(cookieParser);

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

// error middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
	res.send('welcome to your first backend course');
});

// listen
app.listen(PORT, async () => {
	console.log(`server running on http://localhost:${PORT}`);

	// call DB connection
	await connectToDatabse();
});

export default app;

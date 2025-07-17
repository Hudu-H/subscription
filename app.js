import express, { urlencoded } from 'express';
import cookieParser from 'cookie-parser';

// internal imports
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import workflowRouter from './routes/workflow.routes.js';
// import arcjetMiddleware from './middlewares/arcjet.middleware.js';

const app = express();

// middlewares
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(arcjetMiddleware);

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/workflows', workflowRouter);

// error middleware
app.use(errorMiddleware);

app.get('/', (req, res) => {
	res.send('welcome!');
});

// listen
app.listen(PORT, async () => {
	console.log(`server running on http://localhost:${PORT}`);

	// call DB connection
	await connectToDatabase();
});

export default app;

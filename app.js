import express from 'express';

// internal imports
import { PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabse from './database/mongodb.js';

const app = express();

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

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

import express from 'express';

// internal imports
import { PORT } from './config/env.js';

const app = express();

app.get('/', (req, res) => {
	res.send('welcome to your first backend course');
});

app.listen(PORT, () => {
	console.log(`server running on http://localhost:${PORT}`);
});

export default app;

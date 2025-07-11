import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.send('welcome to your first backend course');
});

app.listen(3000, () => {
	console.log('server running on http://localhost:3000');
});

export default app;

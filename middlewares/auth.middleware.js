import jwt from 'jsonwebtoken';

// internal imports
import { JWT_SECRET } from '../config/env.js';
import User from '../models/user.model.js';

// protect routes
async function authorize(req, res, next) {
	try {
		let token;

		// if token exist
		if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
			token = req.headers.authorization.split(' ')[1];
		}

		// if no token
		if (!token) {
			return res.status(401).json({ message: 'Unauthorize' });
		}

		// verify token if it exists
		const decoded = jwt.verify(token, JWT_SECRET);

		// search user in DB
		const user = await User.findById(decoded.userId);

		// if it doesn't exists in DB
		if (!user) return res.status(401).json({ message: 'Unauthorized' });

		// attach user to request being made
		req.user = user;

		next();
	} catch (error) {
		res.status(401).json({
			message: 'Unauthorize',
			error: error.message,
		});
	}
}

export default authorize;

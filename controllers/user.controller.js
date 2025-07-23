// internal imports
import User from '../models/user.model.js';

// fetch users from database
export async function getUsers(req, res, next) {
	try {
		// find all Users
		const users = await User.find();

		// return json
		res.status(200).json({
			success: true,
			data: users,
		});
	} catch (error) {
		next(error);
	}
}

// fetch single user from database
export async function getUser(req, res, next) {
	try {
		// find all Users
		const user = await User.findById(req.params.id).select('-password');

		// if no user
		if (!user) {
			const error = new Error('User not found');
			error.statusCode = 404;
			throw error;
		}

		// else return json
		res.status(200).json({
			success: true,
			data: user,
		});
	} catch (error) {
		next(error);
	}
}

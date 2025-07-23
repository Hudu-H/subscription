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

// create a user
export async function createUser(req, res, next) {
	try {
		const user = new User(req.body);
		await user.save();
		res.status(201).json({
			success: true,
			message: 'New user created successfully',
		});
	} catch (error) {
		res.status(400).json({ message: 'Failed to create user, please try again' });
		next(error);
	}
}

// update user logic
export async function updateUser(req, res, next) {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!user) {
			return res.status(404).json({
				success: true,
				message: 'User not found',
			});
		}
		res.json(user);
	} catch (error) {
		res.status(400).json({ message: 'Unable to update user this time' });
		next(error);
	}
}

// delete a user
export async function deleteUser(req, res, next) {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.json({
			success: true,
			message: 'User deleted successfully',
		});
	} catch (error) {
		res.status(400).json({ message: 'failed to delete user.' });
		next(error);
	}
}

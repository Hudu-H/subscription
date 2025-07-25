import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// internal import
import User from '../models/user.model.js';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';
import dayjs from 'dayjs';
import BlacklistToken from '../models/blacklistToken.model.js';

// implement sign up logic
export async function signUp(req, res, next) {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// create a new user
		const { name, email, password } = req.body;

		// check if user already exist
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			const error = new Error('User already exists');
			error.statusCode = 409;
			throw error;
		}

		// hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// now create user
		const newUsers = await User.create([{ name, email, password: hashedPassword }], { session });

		// generate token
		const token = jwt.sign({ userId: newUsers[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

		await session.commitTransaction();
		session.endSession();

		// return statusCode of user creation
		res.status(201).json({
			success: true,
			message: 'user successfully created',
			data: {
				token,
				user: newUsers[0],
			},
		});
	} catch (error) {
		await session.abortTransaction();
		session.endSession();
		next(error);
	}
}
// implement sign in logic
export async function signIn(req, res, next) {
	try {
		const { email, password } = req.body;

		// check if user exist
		const user = await User.findOne({ email });

		// if user doesn't exist
		if (!user) {
			const error = new Error('User not found');
			error.statusCode = 404;
			throw error;
		}

		// if user exists, validate password
		const isValidPassword = await bcrypt.compare(password, user.password);

		// if invalid password
		if (!isValidPassword) {
			const error = new Error('Invalid password');
			error.statusCode = 401;
			throw error;
		}

		// valid password
		const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

		// return status of 200
		res.status(200).json({
			success: true,
			message: 'User successfully sign-in',
			data: {
				token,
				user,
			},
		});
	} catch (error) {
		next(error);
	}
}
// implement sign out logic
export async function signOut(req, res, next) {
	try {
		const authHeader = req.headers.authorization;
		if (authHeader && authHeader.startsWith('Bearer ')) {
			const token = authHeader.split(' ')[1];

			// decode token to get expiry
			const decoded = jwt.decode(token);
			const expiry =
				decoded && decoded.exp ? new Date(decoded.exp * 1000) : new Date(dayjs + 3600 * 1000);

			// save token to blacklist
			await BlacklistToken.create({ token, expiry });
		}

		res.status(200).json({
			success: true,
			message: 'User successfully signed out',
		});
	} catch (error) {
		next(error);
	}
}

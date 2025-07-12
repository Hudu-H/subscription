import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// internal import
import User from '../models/user.model.js';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js';

// implement sign up logic
export async function signUp(req, res, next) {
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		// logic to create a new user
		const { name, email, password } = req.body;

		// check if user already exist
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			const error = new Error('User already exists');
			error.statusCode = 409;
			throw error;
		}

		// if doesn't exist, hash password
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
// implement sign up logic
export async function signIn(req, res, next) {}
// implement sign up logic
export async function signOut(req, res, next) {}

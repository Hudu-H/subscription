// internal imports
import Subscription from '../models/subscription.model.js';

// create subs
export async function createSubscription(req, res, next) {
	try {
		const subscription = await Subscription.create({
			...req.body,
			user: req.user._id,
		});

		res.status(201).json({
			success: true,
			data: subscription,
		});
	} catch (error) {
		next(error);
	}
}

// get all user subs
export async function getUserSubscriptions(req, res, next) {
	try {
		// check if the user is the same as the one in the token
		if (req.user.id != req.params.id) {
			const error = new Error('You are not the owner of this account');
			error.statusCode = 401;
			throw error;
		}

		const subscriptions = await Subscription.find({ user: req.params.id });

		res.status(200).json({
			success: true,
			data: subscriptions,
		});
	} catch (error) {
		next(error);
	}
}

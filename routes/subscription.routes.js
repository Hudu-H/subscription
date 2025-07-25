import { Router } from 'express';

// internal imports
import authorize from '../middlewares/auth.middleware.js';
import {
	cancelSubscription,
	createSubscription,
	deleteSubscription,
	getAllSubscriptions,
	getSubscriptionDetails,
	getUpcomingRenwals,
	getUserSubscriptions,
	updateSubscription,
} from '../controllers/subscription.controller.js';

// instance of subscription router
const subscriptionRouter = Router();

// get all subscriptions endpoint
subscriptionRouter.get('/', getAllSubscriptions);

// get subs details
subscriptionRouter.get('/:id', authorize, getSubscriptionDetails);

// create subs
subscriptionRouter.post('/', authorize, createSubscription);

// update subs
subscriptionRouter.put('/:id', authorize, updateSubscription);

// delete subs
subscriptionRouter.delete('/:id', authorize, deleteSubscription);

// get all user subs
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

// cancel subs
subscriptionRouter.put('/:id/cancel', authorize, cancelSubscription);

// get upcoming renewals
subscriptionRouter.get('/upcoming-renewals', getUpcomingRenwals);

export default subscriptionRouter;

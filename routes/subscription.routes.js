import { Router } from 'express';

// internal imports
import authorize from '../middlewares/auth.middleware.js';
import {
	createSubscription,
	getUserSubscriptions,
} from '../controllers/subscription.controller.js';

// instance of subscription router
const subscriptionRouter = Router();

// get all subscriptions endpoint
subscriptionRouter.get('/', (req, res) => res.send({ title: 'GET all subscriptions' }));

// get subs details
subscriptionRouter.get('/:id', (req, res) => res.send({ title: 'GET subscription details' }));

// create subs
subscriptionRouter.post('/', authorize, createSubscription);

// update subs
subscriptionRouter.put('/:id', (req, res) => res.send({ title: 'UPDATE subscription' }));

// delete subs
subscriptionRouter.delete('/:id', (req, res) => res.send({ title: 'DELETE subscription' }));

// get all user subs
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

// cancel subs
subscriptionRouter.put('/:id/cancel', (req, res) => res.send({ title: 'CANCEL subscription' }));

// get upcoming renewals
subscriptionRouter.get('/upcoming-renewals', (req, res) =>
	res.send({ title: 'GET upcoming renewals' })
);

export default subscriptionRouter;

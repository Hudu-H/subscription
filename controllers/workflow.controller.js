// do this to single allow a require statement, as we're sticked to using import modules
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import dayjs from 'dayjs';

// internal imports
import Subscription from '../models/subscription.model.js';

// require serve from upstach
const { serve } = require('@upstash/workflow/express');

const REMINDERS = [7, 5, 2, 1];

// responsible for sending reminders
export const sendReminders = serve(async (context) => {
	const { subscriptionId } = context.requestPayload;
	const subscription = await fetchSubscription(context, subscriptionId);

	// simple return if no subscription or not active
	if (!subscription || subscription.status != 'active') return;

	// for renewal
	const renewalDate = dayjs(subscription.renewalDate);

	if (renewalDate.isBefore(dayjs())) {
		console.log(`Renewal date has passed for subscription ${subscriptionId}. Stopping workflow`);
	}

	// workflows
	for (const daysBefore of REMINDERS) {
		const reminderDate = renewalDate.subtract(daysBefore, 'day');

		if (reminderDate.isAfter(dayjs())) {
			await sleepUntilReminder(context, `Reminder ${daysBefore} days before`, reminderDate);
		}

		await triggerReminder(context, `Reminder ${daysBefore} days before`);
	}
});

// fetchSubscription func
async function fetchSubscription(context, subscriptionId) {
	return await context.run('get subscription', () => {
		return Subscription.findById(subscriptionId).populate('user', 'name email');
	});
}

// sleep func
async function sleepUntilReminder(context, label, date) {
	console.log(`Sleeping until ${label} reminder at ${date}`);
	await context.sleepUntil(label, date.toDate());
}

// trigger reminder func
async function triggerReminder(context, label) {
	return await context.run(label, () => {
		console.log(`Triggering ${label} reminder`);

		// later, send email, push notification, sms etc
	});
}

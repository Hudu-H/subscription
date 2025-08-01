import dayjs from 'dayjs';

// internal imports
import transporter, { accountEmail } from '../nodemailer.js';
import { emailTemplates } from './email-template.js';

export async function sendReminderEmail({ to, type, subscription }) {
	if (!to || !type) throw new Error('Missing required parameters');

	// if it exist
	const template = emailTemplates.find((t) => t.label === type);

	// if no template
	if (!template) throw new Error('Invalid email type');

	const mailInfo = {
		userName: subscription.user.name,
		subscriptionName: subscription.name,
		renewalDate: dayjs(subscription.renewalDate).format('MM D, YYYY'),
		planName: subscription.name,
		price: `${subscription.currency} ${subscription.price} ${subscription.frequency}`,
		PaymentMethod: subscription.PaymentMethod,
	};

	// generate message
	const message = template.generateBody(mailInfo);
	const subject = template.generateSubject(mailInfo);

	// mail options
	const mailOptions = {
		from: accountEmail,
		to: to,
		subject: subject,
		html: message,
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return console.log(error, 'Error sending email');

		console.log('Email sent: ' + info.response);
	});
}

import mongoose from 'mongoose';

// sub schema
const subscriptionSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, 'Subscription name is required'],
			trim: true,
			minLength: 2,
			maxLength: 80,
		},
		price: {
			type: Number,
			required: [true, 'Price is required'],
			minLength: [0, 'Price must be greater than 0'],
		},
		currency: {
			type: String,
			enum: ['EURO', 'USD', 'GPB'],
			default: 'USD',
		},
		frequency: {
			type: String,
			enum: ['daily', 'weekly', 'monthly', 'yearly'],
		},
		category: {
			type: String,
			enum: [
				'technology',
				'news',
				'politics',
				'lifestyle',
				'sports',
				'entertainment',
				'finance',
				'others',
			],
			required: true,
		},
		paymentMethod: {
			type: String,
			required: true,
			trim: true,
		},
		status: {
			type: String,
			enum: ['active', 'cancelled', 'expired'],
			default: 'active',
		},
		startDate: {
			type: Date,
			required: true,
			validate: {
				validator: (value) => value <= new Date(),
				message: 'start date must be in the past.',
			},
		},
		renewalDate: {
			type: Date,
			validate: {
				validator: function (value) {
					return value > this.startDate;
				},
				message: 'renewal date must be after the start date.',
			},
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			index: true,
			required: true,
			ref: 'User',
		},
	},
	{ timestamps: true }
);

// auto calculate renewal date
subscriptionSchema.pre('save', function (next) {
	if (!this.renewalDate) {
		const renewalPeriods = {
			daily: 1,
			weekly: 7,
			monthly: 30,
			yearly: 365,
		};
		this.renewalDate = new Date(this.startDate);
		this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
	}

	// auto update status if renewal date has expired
	if (this.renewalDate < new Date()) {
		this.status = 'expired';
	}

	next();
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;

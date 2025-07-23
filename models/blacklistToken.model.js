import mongoose from 'mongoose';

// blacklisted token schema
const blacklistedTokenSchema = new mongoose.Schema({
	token: {
		type: String,
		required: true,
		unique: true,
		expiry: {
			type: Date,
			required: true,
		},
	},
});

const BlacklistToken = mongoose.model('BlacklistToken', blacklistedTokenSchema);

export default BlacklistToken;

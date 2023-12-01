const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	first_name: {
		type: String,
		required: [true, 'user must have a first_name'],
	},
	last_name: {
		type: String,
		required: [true, 'user must have a last_name'],
	},
	email: {
		type: String,
		required: [true, 'user must have an email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'please provide a valid email'],
	},
	gender: {
		type: String,
		required: [true, 'user must have an gender'],
		enum: ['Male', 'Female', 'Others'],
		default: 'Male',
	},
	avater: String,
	domain: {
		type: String,
		required: [true, 'user must from a domain'],
	},
	available: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;

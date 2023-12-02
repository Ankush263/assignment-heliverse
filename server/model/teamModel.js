const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema(
	{
		createdAt: {
			type: Date,
			default: Date.now,
		},

		name: {
			type: String,
			required: [true, 'Must have a team name'],
			unique: true,
		},

		description: {
			type: String,
		},

		userIds: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'User',
			},
		],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

teamSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'userIds',
		select: 'email avatar first_name last_name',
	});

	next();
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;

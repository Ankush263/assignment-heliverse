const Team = require('../model/teamModel');
const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createTeam = catchAsync(async (req, res, next) => {
	const { name, description, userIds } = req.body;
	const users = await User.find({ _id: { $in: userIds } });

	const unavailableUsers = users.filter((user) => !user.available);

	if (unavailableUsers.length > 0) {
		return next(new AppError(`Selected users must be available`, 401));
	}

	const domainSet = new Set();

	for (const user of users) {
		if (domainSet.has(user.domain) && user.available === true) {
			return next(new AppError('Selected users share the same domain', 404));
		}
		domainSet.add(user.domain);
	}
	const newTeam = new Team({ name, description, userIds });
	const team = await newTeam.save();
	res.status(201).json({
		status: 'success',
		data: {
			data: team,
		},
	});
});

exports.getOneTeam = catchAsync(async (req, res, next) => {
	const team = await Team.findById(req.params.id);

	if (!team) {
		return next(new AppError('No team found with that id'));
	}

	res.status(200).json({
		status: 'success',
		data: {
			data: team,
		},
	});
});

exports.getTeams = catchAsync(async (req, res, next) => {
	const team = await Team.find();

	res.status(200).json({
		status: 'success',
		data: {
			data: team,
		},
	});
});

exports.deleteTeam = catchAsync(async (req, res, next) => {
	const team = await Team.findByIdAndDelete(req.params.id);
	if (!team) {
		return next(new AppError('No team is found with that id', 404));
	}
	res.status(204).json({
		status: 'success',
		data: null,
	});
});

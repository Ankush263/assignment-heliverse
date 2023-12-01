const User = require('../model/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.getUsers = catchAsync(async (req, res, next) => {
	let filter = {};
	const features = new APIFeatures(User.find(filter), req.query)
		.pagination()
		.filter();
	const user = await features.query;

	res.status(200).json({
		status: 'success',
		results: user.length,
		data: {
			data: user,
		},
	});
});

exports.getOneUser = catchAsync(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new AppError('No user found with that id'));
	}

	res.status(200).json({
		status: 'success',
		data: {
			data: user,
		},
	});
});

exports.createUser = catchAsync(async (req, res, next) => {
	const user = await User.create(req.body);

	res.status(201).json({
		status: 'success',
		data: {
			data: user,
		},
	});
});

exports.updateUser = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!user) {
		return next(new AppError('No user is found with that id', 404));
	}
	res.status(200).json({
		status: 'success',
		data: {
			data: user,
		},
	});
});

exports.deleteUser = catchAsync(async (req, res, next) => {
	const user = await User.findByIdAndDelete(req.params.id);
	if (!user) {
		return next(new AppError('No user is found with that id', 404));
	}
	res.status(204).json({
		status: 'success',
		data: null,
	});
});

exports.searchByUsername = catchAsync(async (req, res, next) => {
	const user = await User.find({
		$or: [
			{
				first_name: {
					$regex: '.*' + req.query.first_name + '.*',
					$options: 'i',
				},
			},
		],
	});

	res.status(201).json({
		status: 'success',
		data: {
			data: user,
		},
	});
});

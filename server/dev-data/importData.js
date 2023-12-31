const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
const User = require('../model/userModel');

const DB = process.env.DATABASE.replace(
	'<PASSWORD>',
	process.env.DATABASE_PASSWORD
);

mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	.then(() => {
		console.log(`DB connected successfully 😃 🚀`);
	});

const users = JSON.parse(
	fs.readFileSync(`${__dirname}/heliverse_mock_data.json`, 'utf-8')
);

const importData = async () => {
	try {
		await User.create(users, { validateBeforeSave: false });
		console.log(`Data successfully loaded`);
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

const deleteData = async () => {
	try {
		await User.deleteMany();
		console.log(`Data successfully deleted`);
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

if (process.argv[2] === '--import') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}

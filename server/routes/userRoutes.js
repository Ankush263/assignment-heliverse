const express = require('express');

const {
	getUsers,
	getOneUser,
	createUser,
	updateUser,
	deleteUser,
	searchByUsername,
} = require('../controllers/userControllers');

const router = express.Router();

router.route('/search').get(searchByUsername);

router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getOneUser).patch(updateUser).delete(deleteUser);

module.exports = router;

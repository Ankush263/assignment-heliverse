const express = require('express');

const {
	createTeam,
	deleteTeam,
	getOneTeam,
	getTeams,
} = require('../controllers/teamControllers');

const router = express.Router();

router.route('/').post(createTeam).get(getTeams);
router.route('/:id').delete(deleteTeam).get(getOneTeam);

module.exports = router;

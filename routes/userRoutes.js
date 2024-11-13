const express = require('express');
const router = express.Router();

const {getAllUsers, getAllUsersStatic} = require('../controllers/userController')

router.route('/').get(getAllUsers)
router.route('/static').get(getAllUsersStatic)

module.exports = router

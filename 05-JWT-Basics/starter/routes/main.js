const express = require('express');
const router = express.Router();

const { 
    login,
    dashboard
} = require('../controllers/main');

const authenticationMiddleware = require('../middleware/auth');


// before the users get to the dashboard they have to go through authenticationMiddleware.
router.route('/dashboard').get(authenticationMiddleware, dashboard);


router.route('/login').post(login);

module.exports = router;
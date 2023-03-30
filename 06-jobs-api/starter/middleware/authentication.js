const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
    // get token from header
    const authHeader = req.headers.authorization;

    // check whether token exist or start with Bearer schema
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    // split token from Bearer schema
    // then just take the token
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the job routes
        req.user = {userId: payload.userId, name: payload.name};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

}

module.exports = auth;
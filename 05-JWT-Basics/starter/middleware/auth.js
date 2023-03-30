const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const authenticationMiddleware = (req, res, next) => {
    // get token from header
    const authHeader = req.headers.authorization;

    // if the token does not exist or it does not start with <Bearer> it will throw an error
    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No token provided');
    }

    // seperate the <Bearer> word with token
    // we will just get the token
    const token = authHeader.split(' ')[1];

    // validation
    try {
        // decoded the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decoded;
        req.user = {id, username};
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route');
    }

}


module.exports = authenticationMiddleware;
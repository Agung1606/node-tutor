const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    const user = await User.create({...req.body});
    // create token
    const token = user.createJWT();
    // send respond
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });

    // console.log(user.groak());
}

const login = async (req, res) => {
    // unpack the incoming request body
    const { email, password } = req.body;

    // user must enter email and password otherwise it will throw this error
    if(!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }

    // find user account using email, because email is unique in the database
    const user = await User.findOne({ email });
    // check if the user account exists or not
    if(!user) {
        throw new UnauthenticatedError('Invalid Credentials');
    } 

    // compare password
    // we have made comparePassword method in the model
    const isPasswordCorrect = await user.comparePassword(password);
    // if the entered password does not same as password in the database, it will throw this error
    if(!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials');
    }

    // create token
    const token = user.createJWT();

    // send respond
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
    register,
    login
}
// check username, password in req.body(/login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

// import jwt
const jwt = require('jsonwebtoken');

const { BadRequestError } = require('../errors');

const login = async (req, res) => {
    const {username, password} = req.body;
    
    if(!username || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    
    // just for practice we create id with a date, normally it will be provided with DB
    const id = new Date().getDate();

    // create token
    // try to keep payload small, better experience for user
    // don't ever put password here
    // just for practice, in production use long, complex, and unguessable string value for jwt_secret okay!!!!!!!!!
    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'}); // token will be expires in 30 days

    res.status(200).json({msg: 'user created', token});
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json(
        {msg: `Hello, ${req.user.username}`,
        secret: `Here is your authorized data, your lucky number is ${luckyNumber}`}
    );

}

module.exports = {
    login,
    dashboard
};
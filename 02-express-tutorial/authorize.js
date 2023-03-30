const authorize = (req, res, next) => {
    const { user } = req.query;
    if(user === 'agung') {
        req.user = {name: 'agung', age: 19};
        next();
    } else {
        res.status(401).send('<h1>Unauthorized</h1>');
    }
}

module.exports = authorize;
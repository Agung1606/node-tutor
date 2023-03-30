const errorHandleMiddleware = async (err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something went wrong, try again later!');
}

module.exports = errorHandleMiddleware;
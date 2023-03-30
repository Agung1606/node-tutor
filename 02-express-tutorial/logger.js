const logger = (req, res, next) => {
    method = req.method;
    url = req.url;
    time = new Date().getFullYear();
    console.log(method, url, time);
    next();
}

module.exports = logger;
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {

  let customError = {
    // set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, // if in the err I have the statusCode then use it otherwise use status code internal server error
    msg: err.message || 'Something went wrong, Try again later' // if in the err I have the message then use it otherwise use 'Something went wrong, Try again later'.
  }

  // custom error for Validation error
  if(err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors).map(item => item.message).join(',');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // custom error for email duplicate
  if(err.code && err.code === 11000) {
    // Object.keys function will give us the array of keys err
    customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, Please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // custom error for cast error
  if(err.name === 'CastError') {
    customError.msg = `No item found with id ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorHandlerMiddleware

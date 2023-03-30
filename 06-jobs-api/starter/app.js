require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// extra packages security
const helmet = require('helmet'); // helps you secure HTTP headers returned by your Express apps
const cors = require('cors'); // a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
const xss = require('xss-clean'); // This will sanitize any data in req.body, req.query, and req.params. You can also access the API directly if you don't want to use as middleware.
const rateLimiter = require('express-rate-limit');

// routers
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// connect DB
const connectDB = require('./db/connect');

// authenticate
const authenticateUser = require('./middleware/authentication');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(express.json());

// === Security Basic ===
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 request per windowMs
  })
);
// extra packages middleware for security
app.use(helmet());
app.use(cors());
app.use(xss());
// === Security Basic ===

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter); // here i ask the token before user hits all of the jobsRouter

// error
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();

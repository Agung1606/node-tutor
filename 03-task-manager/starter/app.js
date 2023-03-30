// to connect with secret variable in the .env file we need this code
require('dotenv').config();
// express
const express = require('express');
const app = express();
// routes
const tasks = require('./routes/tasks');
// connect to database
const connectDB = require('./db/connect');
// error handler and not found
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');



// Middleware
app.use(express.json());
app.use(express.static('./public'))

// route
app.use('/api/v1/tasks', tasks);

// error and not found middleware
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const hostName = 'localhost';

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, hostName, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();

// MongoDB
// - No Sql, Non retalional database
// - Store Json
// - Eas to get started
// - Free cloud hosting - atlas
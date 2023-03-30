require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');

const productRouter = require('./routes/products');

const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


// middleware
app.use(express.json());

// route
app.use('/api/v1/products', productRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const hostname = 'localhost';

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, hostname, () => {
            console.log(`Server is listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();
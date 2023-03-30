require('dotenv').config();

const express = require('express');
const app = express();

const Products = require('./models/product');
const productsJson = require('./products.json');

const connectDB = require('./db/connect');

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Products.deleteMany();
        await Products.create(productsJson);
        console.log('SUCCESS!!!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


start();
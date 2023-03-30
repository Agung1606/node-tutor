const express = require('express');
const app = express();

const people = require('./routes/people');
const auth = require('./routes/auth');

const port = 5000;
const hostName = 'localhost';

// app.use() is just for applies middleware to all our routes

// static assets
app.use(express.static('./methods-public'))
// parse form data
app.use(express.urlencoded({ extended: false }))
// parse json atau handle incoming json data
app.use(express.json())

app.use('/api/people', people);
app.use('/login', auth);


app.listen(port, hostName, '', () => {
    console.log(`server listening on port ${port}`);
})
const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url, {
        // if you use version 6 you don't need to do this
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
}

module.exports = connectDB;

// this will be put in the .env so that it will be secret and other people can't see it

// this will throw us to an deprecated error
// mongoose
//     .connect(connectionString)
//     .then(() => console.log('connecting to the database...'))
//     .catch((err) => console.log(err))


// this is the way to connected to monogoDB
// mongoose.connect(connectionString, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true
// }).then(() => console.log('connected to the database...')).catch(err => console.log(err))
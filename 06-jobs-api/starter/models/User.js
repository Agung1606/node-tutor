const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name'],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'please provide an email'],
        // the email have to match this regex
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'please provide a valid email'
        ],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please provide a password'],
        minlength: 6
    }
})

// Pre middleware functions are executed one after another
UserSchema.pre('save', async function() {
    // before we send passwords to our database, we have to encode them, for security purposes
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// create instance method
UserSchema.methods.createJWT = function() {
    return jwt.sign(
        {
            userId: this._id, 
            name: this.name
        },
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME}
    );
};

// create method for comapre password
UserSchema.methods.comparePassword = async function(candidatePassword) {
    // this is how to compare entered bcrypt password with bcrypt password in the database
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}


// jadi untuk setiap instance dari model User bakalan punya method ini
// gua kasih nama method ini groak
UserSchema.methods.groak = function() {
    const result = 'groak didirikan pada tahun 2016';
    return result;
}

module.exports = mongoose.model('User', UserSchema);
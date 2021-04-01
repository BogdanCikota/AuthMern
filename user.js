const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

//schema
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String
});

userSchema.plugin(findOrCreate);

//model
const User = mongoose.model('User', userSchema);

module.exports = User;
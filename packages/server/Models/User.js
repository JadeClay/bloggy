const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

/* CREATING USER TABLE SCHEMA */
const UserSchema = new mongoose.Schema({
  email: {type: String, required:true, unique:true},
  username : {type: String, unique: true, required:true},
});
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;
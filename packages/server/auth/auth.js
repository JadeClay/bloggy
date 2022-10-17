const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/User');

/* Passport Local Login Strategy */

passport.use(new LocalStrategy(User.authenticate()));

module.exports = passport;
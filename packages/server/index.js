/* 3rd party libraries */
const dotenv = require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const passport = require('./auth/auth');
const session = require('express-session')({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false
});
const cookieParser = require('cookie-parser');

/* Bloggy libraries */
const InfoMessages = require('./Utils/Error');

/* Express.js related modules */
const router = require('./routes');
const User = require('./Models/User');
const app = express();

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },

  credentials: true,
}

/* Using app-level middleware */
app.use(passport.initialize());
app.use(session);
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors(corsOptions));
app.use(cookieParser());

/* Using method to serialize and deserialize sessions */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


/* Adding routes to the API */
app.use(router);


/* Connecting database */
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    .then(res => {
        if(res){
            InfoMessages.Info('Database connected succesfully');
            app.listen(process.env.port, () => {
              InfoMessages.Info(`App listening on port ${process.env.port}`);
          });
        }


    });





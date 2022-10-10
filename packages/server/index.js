const dotenv = require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const router = require('./routes');

const app = express();

app.use(cors());

/* Connecting database */
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    .then(res => {
        if(res){
            console.log("Database connected succesfully")
        }

        app.use(router);
        app.listen(process.env.port, () => {
            console.log(`App listening on port ${process.env.port}`);
        });
    });





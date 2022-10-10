const dotenv = require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const cors = require('cors');

const express = require('express');
const app = express();

const Post = require('./Models/Post');

/* Connecting database */
async function testConn(){
    try {
        await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`).then(res => {if(res){console.log("Database connected succesfully")}});
    } catch (error) {
        console.log(error);
    }
}

testConn();

app.use(cors());

app.get('/post/last', async (req, res) => {
    const all = await Post.find({}).limit(1).sort({ _id: -1}).lean();
    res.status(200).send(all);
})

app.get('/hello', (req, res) => {
    res.status(200).send({body: "Hello World"});
})

app.listen(process.env.port);

console.log(`App listening on port ${process.env.port}`);
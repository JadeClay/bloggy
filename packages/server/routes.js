const express = require("express");
const router = express.Router();

/*Importing all mongodb models */
const Post = require('./Models/Post');

router.get('/posts/last', async (req, res) => {
    const all = await Post.find({}).limit(1).sort({ _id: -1}).lean();
    res.status(200).send(all);
})

router.get('/hello', (req, res) => {
    res.status(200).send({body: "Hello World"});
})

module.exports = router
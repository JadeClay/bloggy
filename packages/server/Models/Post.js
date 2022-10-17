const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:  { type: String, required: true }, // String is shorthand for {type: String}
    author: { type: String, required: true },
    body:   { type: String, required: true },
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: { type: Boolean, required: true },
  });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
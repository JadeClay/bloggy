const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name:  { type: String, required: true }, // String is shorthand for {type: String}
    description: { type: String, required: true },
  });

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author;
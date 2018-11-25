const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ministerSchema = new Schema({
  name: String,
  title: String,
  bio: String,
});

module.exports = mongoose.model('Minister', ministerSchema);

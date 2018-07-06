const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  twitterId: String
});

mongoose.model('users', userSchema);
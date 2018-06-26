const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  type: String,
  scheduledFor: {
    type: String,
    index: true
  },
  to: String,
  subject: String,
  body: String,
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('reminders', reminderSchema);
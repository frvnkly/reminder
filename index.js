const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');
require('./model/User');
require('./model/Reminder');
require('./services/passport');

const ReminderManager = require('./services/ReminderManager');
mongoose.connect(keys.mongoURI);

const app = express();
app.reminders = new ReminderManager();

app.use(bodyParser.json());
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 1000, // 30 days
  keys: [keys.cookieKey],
}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/reminderRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');
require('./model/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 1000, // 30 days
  keys: [keys.cookieKey],
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('hello');
});

require('./routes/authRoutes')(app);
require('./routes/reminderRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
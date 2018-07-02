const mongoose = require('mongoose');
const Reminder = mongoose.model('reminders');

const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  app.get(
    '/api/reminders',
    requireLogin,
    async (req, res) => {
      const reminders = await Reminder
        .find({ _user: req.user.id })
        .sort({ scheduledFor: 1 });
      res.send(reminders);
    }
  );

  app.post(
    '/api/reminders',
    (req, res) => {
      const userId = req.user ? req.user.id : null;
      app.reminders.scheduleReminder(req.body, userId);
      res.send({});
    }
  );

  app.delete(
    '/api/reminders',
    requireLogin,
    (req, res) => {
      app.reminders.cancelReminder(req.body.id);
      res.send({});
    }
  );
};
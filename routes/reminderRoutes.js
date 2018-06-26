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
      if (req.body.type === 'email') {
        app.reminders.scheduleEmailReminder(
          req.body.reminderData, 
          req.body.time,
          req.user.id
        );
      };
      res.send({});
    }
  );

  app.delete(
    '/api/reminders',
    (req, res) => {
      res.send('cancel reminder');
    }
  );
};
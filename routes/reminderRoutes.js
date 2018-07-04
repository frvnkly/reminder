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
      if (validateFormData(req.body)) {
        const userId = req.user ? req.user.id : null;
        app.reminders.scheduleReminder(req.body, userId);
        res.end();
      } else {
        res.status(422).end();
      }
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

const validateFormData = formData => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const phoneRegex = /[+][0-9]{11}/;

  const timeValid = new Date(formData.time) > Date.now();
  const typeValid = ['email', 'sms'].includes(formData.type);
  const toValid = emailRegex.test(formData.message.to) || phoneRegex.test(formData.message.to);

  return timeValid && typeValid && toValid;
};
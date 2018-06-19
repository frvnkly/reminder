const sendgrid = require('@sendgrid/mail');

const keys = require('../config/keys');

module.exports = app => {
  app.get(
    '/api/reminders',
    (req, res) => {
      res.send('get all reminders');
    }
  );

  app.post(
    '/api/reminders',
    (req, res) => {
      if (req.body.type === 'email') {
        app.reminders.scheduleEmailReminder(
          req.body.reminderData, 
          req.body.time
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
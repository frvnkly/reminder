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
      scheduleEmailReminder(req.body);
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

function scheduleEmailReminder(reminderForm) {
  sendgrid.setApiKey(keys.sendgridKey);
  const mail = { ...reminderForm };
  sendgrid.send(mail);
}
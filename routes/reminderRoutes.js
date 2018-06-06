module.exports = app => {
  app.get(
    '/api/reminders',
    (req, res) => {
      res.send('get all reminders');
    }
  );

  app.post(
    '/api/reminders/create',
    (req, res) => {
      res.send('schedule reminder');
    }
  );

  app.post(
    '/api/reminders/cancel',
    (req, res) => {
      res.send('cancel reminder');
    }
  );
};
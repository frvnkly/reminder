const schedule = require('node-schedule');
const sendgrid = require('@sendgrid/mail');
const keys = require('../config/keys');

class ReminderManager {
  constructor() {
    this._reminders = new Map();
  }

  scheduleEmailReminder(reminderData, timeString) {
    const time = new Date(timeString);
    schedule.scheduleJob(time, () => {
      sendgrid.setApiKey(keys.sendgridKey);
      sendgrid.send(reminderData);
    });
  }
}

module.exports = ReminderManager;
const schedule = require('node-schedule');
const sendgrid = require('@sendgrid/mail');
const twilio = require('twilio');
const keys = require('../config/keys');

class ReminderManager {
  constructor() {
    this._reminders = new Map();

    // sendgrid
    sendgrid.setApiKey(keys.sendgridKey);

    // twilio
    this._twilio = new twilio(keys.twilioSID, keys.twilioToken);
  }

  scheduleEmailReminder(reminderData, timeString) {
    const time = new Date(timeString);
    schedule.scheduleJob(time, () => {
      sendgrid.send(reminderData);
    });
  }

  scheduleTextReminder(reminderData, timeString) {
    const time = new Date(timeString);
    schedule.scheduleJob(time, () => {
      this._twilio.messages.create({
        from: keys.twilioNumber,
        ...reminderData,
      });
    });
  }
}

module.exports = ReminderManager;
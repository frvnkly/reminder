const mongoose = require('mongoose');
const schedule = require('node-schedule');
const sendgrid = require('@sendgrid/mail');
const twilio = require('twilio');
const keys = require('../config/keys');

const Reminder = mongoose.model('reminders');

class ReminderManager {
  constructor() {
    this._reminders = new Map();

    // sendgrid
    sendgrid.setApiKey(keys.sendgridKey);

    // twilio
    this._twilio = new twilio(keys.twilioSID, keys.twilioToken);
  }

  scheduleEmailReminder(reminderData, timeString, userId) {
    // create reminder document
    const reminder = new Reminder({
      type: 'email',
      scheduledFor: timeString,
      to: reminderData.to,
      subject: reminderData.subject,
      body: reminderData.text,
      _user: userId
    });

    // schedule reminder
    const time = new Date(timeString);
    const j = schedule.scheduleJob(time, () => {
      this._cleanUpReminder(reminder._id);
      sendgrid.send(reminderData);
    });

    // enter reminder into manager and database
    this._reminders.set(reminder._id.toString(), j);
    reminder.save();
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

  cancelReminder(id) {
    // cancel job
    this._reminders.get(id).cancel();
    // clear bookkeeping
    this._cleanUpReminder(id);
  }

  _cleanUpReminder(id) {
    // remove from manager
    this._reminders.delete(id);
    // remove from database
    Reminder.findByIdAndRemove(id).exec();
  }
}

module.exports = ReminderManager;
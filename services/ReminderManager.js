const mongoose = require('mongoose');
const schedule = require('node-schedule');
const sendgrid = require('@sendgrid/mail');
const keys = require('../config/keys');

const Reminder = mongoose.model('reminders');

class ReminderManager {
  constructor() {
    this._reminders = new Map();
    // sendgrid
    sendgrid.setApiKey(keys.sendgridKey);
    // twilio
    this._twilio = require('twilio')(keys.twilioSID, keys.twilioToken);
  }

  scheduleReminder(reminderData, userId=null) {
    // create reminder document
    const reminder = new Reminder({
      type: reminderData.type,
      scheduledFor: reminderData.time,
      to: reminderData.message.to,
      subject: reminderData.message.subject,
      body: reminderData.message.body || reminderData.message.text,
      _user: userId
    });

    // schedule reminder
    const time = new Date(reminderData.time);
    const j = schedule.scheduleJob(time, () => {
      this._cleanUpReminder(reminder._id);
      switch(reminder.type) {
        case 'email':
          this._sendEmail(reminderData.message);
          break;
        case 'sms':
          this._sendText(reminderData.message);
          break;
        default:
          return;
      }
    });

    // enter reminder into manager and database if requested by existing user
    if (userId) {
      this._reminders.set(reminder._id.toString(), j);
      reminder.save();
    }
  }

  cancelReminder(id) {
    // cancel job
    const job = this._reminders.get(id);
    if (job) {
      job.cancel();
    }
    // clear bookkeeping
    this._cleanUpReminder(id);
  }

  async _recoverReminders() {
    const reminders = await Reminder.find({});
  }

  _cleanUpReminder(id) {
    // remove from manager
    this._reminders.delete(id);
    // remove from database
    Reminder.findByIdAndRemove(id).exec();
  }

  _sendEmail(emailData) {
    const email = { ...emailData };
    if (!email.subject) {
      email.subject = 'Reminder';
    }
    if (!email.text) {
      email.text = ' ';
    }
    sendgrid.send(email);
  }

  _sendText(smsData) {
    const sms = { ...smsData };
    if (!sms.body) {
      sms.body = 'Reminder';
    }
    sms.from = keys.twilioNumber;
    this._twilio.messages
      .create(sms)
      .done();
  }
}

module.exports = ReminderManager;
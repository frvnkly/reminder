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

    // recover previously scheduled reminders on server start
    this._recoverReminders();
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
    const j = schedule.scheduleJob(time, () => this._sendReminder(reminder));

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
    const reminders = await Reminder.find({}).sort({ scheduledFor: 1 });
    reminders.forEach(reminder => {
      // send out overdue reminders
      if (reminder.scheduledFor <= Date.now()) {
        if (!reminder.body) {
          reminder.body = 'Reminder';
        }
        reminder.body += '\n\n**LATE**';
        this._sendReminder(reminder);
        this._cleanUpReminder(reminder._id);
      } else {  // queue up pending reminders
        const time = new Date(parseInt(reminder.scheduledFor, 10));
        const j = schedule.scheduleJob(time, () => this._sendReminder(reminder));
        this._reminders.set(reminder._id.toString(), j);
      }
    });
  }

  _cleanUpReminder(id) {
    // remove from manager
    this._reminders.delete(id);
    // remove from database
    Reminder.findByIdAndRemove(id).exec();
  }

  _sendReminder(reminder) {
    const message = {
      to: reminder.to,
      subject: reminder.subject,
      body: reminder.body,
    };

    switch(reminder.type) {
      case 'email':
        this._sendEmail(message);
        break;
      case 'sms':
        this._sendText(message);
        break;
      default:
    }

    this._cleanUpReminder(reminder._id);
  }

  _sendEmail(emailData) {
    emailData.from = emailData.to;
    emailData.text = emailData.body || ' ';
    if (!emailData.subject) {
      emailData.subject = 'Reminder';
    }
    sendgrid.send(emailData);
  }

  _sendText(smsData) {
    smsData.from = keys.twilioNumber;
    if (!smsData.body) {
      smsData.body = 'Reminder';
    }
    this._twilio.messages
      .create(smsData)
      .done();
  }
}

module.exports = ReminderManager;
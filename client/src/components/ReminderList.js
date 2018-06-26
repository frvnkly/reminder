import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchReminders } from '../actions/reminderActions';

class ReminderList extends Component {
  componentDidMount() {
    this.props.fetchReminders();
  }

  renderReminders() {
    return this.props.reminders.map((reminder, i) => {
      const scheduledFor = new Date(parseInt(reminder.scheduledFor, 10))
        .toLocaleString();
      return (
        <div className='card' key={i}>
          <div className='card-content'>
            <span className='card-title'>Scheduled for {scheduledFor}</span>
            <p><b className='orange-text'>to</b> {reminder.to}</p>
            {reminder.subject ? <p><b className='orange-text'>subject</b> {reminder.subject}</p> :null}
            {reminder.body ? <i>{reminder.body}</i> : null}
          </div>
        </div>
      );
    });
    
  }

  render() {
    console.log(this.props.reminders);
    return this.renderReminders();
  }
}

const mapStateToProps = state => {
  return { reminders: state.reminders };
};

export default connect(mapStateToProps, { fetchReminders })(ReminderList);
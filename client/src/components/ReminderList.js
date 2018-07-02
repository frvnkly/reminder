import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { fetchReminders } from '../actions/reminderActions';

class ReminderList extends Component {
  componentDidMount() {
    this.props.fetchReminders();
  }

  cancelReminderHandler = async reminderId => {
    await axios.delete('/api/reminders', { data: { id: reminderId } });
    this.props.fetchReminders();
  }

  renderReminders() {
    if (this.props.reminders.length > 0) {
      return this.props.reminders.map((reminder, i) => {
        const scheduledFor = new Date(parseInt(reminder.scheduledFor, 10))
          .toLocaleString();
        return (
          <div className='card' key={i}>
            <div className='card-content'>
              <span className='card-title'>Scheduled for {scheduledFor}</span>
              <p><b className='orange-text'>to</b> {reminder.to}</p>
              {reminder.subject 
                ? <p><b className='orange-text'>subject</b> {reminder.subject}</p>
                : null}
              {reminder.body 
                ? <blockquote><i>{reminder.body}</i></blockquote> 
                : null}
              <a className="btn-floating red right" onClick={() => this.cancelReminderHandler(reminder._id)}>
                <i className="material-icons">close</i>
              </a>
            </div>
            <div className='card-action red lighten-1'>
            </div>
          </div>
        );
      });
    }
    return (
      <p className='center-align grey-text'>
        <i>No scheduled reminders.</i>
      </p>
    );
  }

  render() {
    return (
      this.props.auth
      ? <div style={{ margin: '20px auto 100px auto' }}>
          {this.renderReminders()}
        </div>
      : null
    );
  }
}

const mapStateToProps = state => {
  return { 
    auth: state.auth,
    reminders: state.reminders 
  };
};

export default connect(mapStateToProps, { fetchReminders })(ReminderList);
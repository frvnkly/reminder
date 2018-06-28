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
        </div>
      );
    });
    
  }

  render() {
    return (
      <div>
        <h5 className='grey-text center-align'>PENDING</h5>
        {this.renderReminders()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { reminders: state.reminders };
};

export default connect(mapStateToProps, { fetchReminders })(ReminderList);
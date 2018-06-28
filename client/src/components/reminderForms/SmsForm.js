import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import './ReminderForm.css';
import FormError from './FormError';
import { fetchReminders } from '../../actions/reminderActions';

class SmsForm extends Component {
  state = {
    form: {
      time: {
        type: 'datetime-local',
        icon: 'alarm',
        placeholder: 'Time',
        value: '',
        valid: false,
        touched: false,
        errors: [],
      },
      phone: {
        type: 'tel',
        icon: 'smartphone',
        placeholder: 'Phone Number (+1234567890)',
        value: '',
        valid: false,
        touched: false,
        errors: [],
      },
      body: {
        type: 'text',
        icon: 'message',
        placeholder: 'Body (optional)',
        value: '',
        valid: true,
        touched: false,
        errors: [],
      },
    },
    formValid: false,
  }

  inputChangeHandler = (event, id) => {
    const updatedValue = event.target.value;
    this.setState(prevState => {
      const updatedForm = { 
        ...prevState.form,
        [id]: { 
          ...prevState.form[id],
          value: updatedValue,
          touched: true,
        },
      };
      return { form: updatedForm };
    }, () => this.validateField(id));
  }

  validateField = id => {
    let fieldValid = false;
    const errors = [];
    switch (id) {
      case 'time':
        const hasTime = this.state.form.time.value !== '';
        if (!hasTime) {
          errors.push('Required');
        }
        const isFuture = new Date(this.state.form.time.value) > Date.now();
        if (!isFuture) {
          errors.push('Please enter a valid date and time in the future');
        }
        fieldValid = hasTime && isFuture;
        break;
      case 'phone':
        const hasPhone = this.state.form.phone.value !== '';
        if (!hasPhone) {
          errors.push('Required');
        }
        const isPhoneNumber = this.state.form.phone.value.match(
          /[+][0-9]{10}/
        );
        if (!isPhoneNumber) {
          errors.push(
            `Please enter a valid 10-digit phone number 
            in the form of +1234567890`
          );
        }
        fieldValid = hasPhone && isPhoneNumber;
        break;
      default:
        return
    }

    this.setState(prevState => {
      const updatedForm = {
        ...this.state.form,
        [id]: { 
          ...this.state.form[id],
          valid: fieldValid,
          errors: errors },
      };
      return { form: updatedForm };
    }, this.validateForm);
  }

  validateForm = () => {
    let formValid = true;
    for (const field in this.state.form) {
      if (!this.state.form[field].valid) {
        formValid = false;
        break;
      }
    }
    this.setState({ formValid });
  }

  submitForm = async () => {
    const time = new Date(this.state.form.time.value).valueOf();
    const formData = {
      type: 'sms',
      time: time,
      reminderData: {
        to: this.state.form.phone.value,
        body: this.state.form.body.value
      }
    };
    await axios.post('/api/reminders', formData);
    await this.props.fetchReminders();
    this.props.close();
  }

  renderForm() {
    const formFields = [];
    const formConfig = this.state.form;
    for (const field in formConfig) {
      let validState = null;
      if (this.state.form[field].touched) {
        if (this.state.form[field].valid) {
          validState = 'valid';
        } else {
          validState = 'invalid';
        }
      }
      formFields.push(
        <div className='input-field' key={field}>
          <i className='material-icons prefix'>{formConfig[field].icon}</i>
          <input
            className={validState}
            placeholder={formConfig[field].placeholder}
            id={field}
            type={formConfig[field].type}
            value={this.state.form[field].value}
            onChange={event => this.inputChangeHandler(event, field)} />
          <FormError errors={this.state.form[field].errors} />
        </div>
      );
    }

    return (
        <form>
          {formFields}
          <div className='row'>
            <div className='col s6'>
              <a className='btn' onClick={this.props.close}>Cancel</a>
            </div>
            <div className='col s6'>
              <a 
                className='btn' 
                onClick={this.submitForm} 
                disabled={!this.state.formValid}>
                  Submit
              </a>
            </div>
          </div>
        </form>
    );
  }

  render() {
    return (
      <div className='ReminderForm'>
        <h5>Schedule a Text Reminder</h5>
        {this.renderForm()}
      </div>
    );
  }
}

export default connect(null, { fetchReminders })(SmsForm);
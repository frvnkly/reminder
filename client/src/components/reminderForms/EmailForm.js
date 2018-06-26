import React, { Component } from 'react';
import axios from 'axios';

import './ReminderForm.css';
import FormError from './FormError';

class EmailForm extends Component {
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
      email: {
        type: 'email',
        icon: 'email',
        placeholder: 'Email Address',
        value: '',
        valid: false,
        touched: false,
        errors: [],
      },
      subject: {
        type: 'text',
        icon: 'event_note',
        placeholder: 'Subject (optional)',
        value: '',
        valid: true,
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
      case 'email':
        const hasEmail = this.state.form.email.value !== '';
        if (!hasEmail) {
          errors.push('Required');
        }
        const isEmail = this.state.form.email.value.match(
          // eslint-disable-next-line
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if (!isEmail) {
          errors.push('Please enter a valid email address');
        }
        fieldValid = hasEmail && isEmail;
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

  submitForm = () => {
    const time = new Date(this.state.form.time.value).valueOf();
    const formData = {
      type: 'email',
      time: time,
      reminderData: {
        to: this.state.form.email.value,
        from: this.state.form.email.value,
        subject: this.state.form.subject.value,
        text: this.state.form.body.value
      }
    };
    axios.post('/api/reminders', formData)
      .then(this.props.close);
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
        <h5>Schedule an Email Reminder</h5>
        {this.renderForm()}
      </div>
    );
  }
}

export default EmailForm;
import React, { Component } from 'react';
import axios from 'axios';

import './EmailForm.css';

class EmailForm extends Component {
  state = {
    form: {
      time: {
        type: 'datetime-local',
        placeholder: 'Time',
        value: ''
      },
      email: {
        type: 'email',
        placeholder: 'Email',
        value: ''
      },
      subject: {
        type: 'text',
        placeholder: 'Subject',
        value: ''
      },
      body: {
        type: 'textarea',
        placeholder: 'Body',
        value: ''
      },
    }
  }

  inputChangeHandler = (event, id) => {
    const updatedValue = event.target.value;
    this.setState(prevState => {
      const updatedForm = { ...prevState.form };
      updatedForm[id].value = updatedValue;
      return { form: updatedForm };
    });
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
      if (formConfig[field].type === 'textarea') {
        formFields.push(
          <div className='input-field' key={field}>
            <textarea
              placeholder={formConfig[field].placeholder}
              id={field}
              className='materialize-textarea'
              value={this.state.form[field].value}
              onChange={event => this.inputChangeHandler(event, field)} />
          </div>
        );
      } else {
        formFields.push(
          <div className='input-field' key={field}>
            <input
              placeholder={formConfig[field].placeholder}
              id={field}
              type={formConfig[field].type}
              value={this.state.form[field].value}
              onChange={event => this.inputChangeHandler(event, field)} />
          </div>
        );
      }
    }

    return (
        <form>
          {formFields}
          <div className='row'>
            <div className='col s6'>
              <a className='btn' onClick={this.props.close}>Cancel</a>
            </div>
            <div className='col s6'>
              <a className='btn' onClick={this.submitForm}>Submit</a>
            </div>
          </div>
        </form>
    );
  }

  render() {
    return (
      <div className='EmailForm'>
        <h5>Schedule an Email Reminder</h5>
        {this.renderForm()}
      </div>
    );
  }
}

export default EmailForm;
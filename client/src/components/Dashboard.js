import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect} from 'react-redux';

import Modal from './ui/Modal';
import EmailForm from './reminderForms/EmailForm';
import SmsForm from './reminderForms/SmsForm';
import ReminderList from './ReminderList';

class Dashboard extends Component {
  state = {
    showModal: false,
    modalContent: 'emailForm',
    showButtons: false,
  }

  openModalHandler = modalContent => {
    this.setState({
      showModal: true,
      modalContent,
      showButtons: false
    });
  }

  buttonMenuHandler = () => {
    this.setState(prevState => {
      return { showButtons: !prevState.showButtons };
    });
  }

  modalCloseHandler = () => {
    this.setState({ showModal: false });
  }

  render() {
    let content = <Redirect to='/' />;

    if (this.props.auth) {
      let modal = null;
      let buttonGroup = null;
      if (this.state.showModal) {
        let modalContent;
        switch (this.state.modalContent) {
          case 'emailForm':
            modalContent = <EmailForm close={this.modalCloseHandler} />
            break;
          case 'smsForm':
            modalContent = <SmsForm close={this.modalCloseHandler} />
            break;
          default:
        }

        modal =
          <Modal close={this.modalCloseHandler}>
            {modalContent}
          </Modal>;
      } else {
        buttonGroup =
          <div 
            style={{ 
              position: 'fixed', 
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column-reverse', 
              right: '23px', 
              bottom: '23px' }}
            className='hide-on-large-only'>
              <a 
                className='btn-floating btn-large red' 
                onClick={this.buttonMenuHandler}>
                  <i className='material-icons'>add</i>
              </a>
              {this.state.showButtons
                ? <ul>
                    <li style={{ marginBottom: '15px' }}>
                      <a 
                        className="btn-floating red" 
                        onClick={() => this.openModalHandler('emailForm')}>
                          <i className="material-icons">email</i>
                      </a>
                    </li>
                    <li>
                      <a 
                        className="btn-floating red"
                        onClick={() => this.openModalHandler('smsForm')}>
                          <i className="material-icons">sms</i>
                      </a>
                    </li>
                  </ul>
                : null}
          </div>
      }

      content = (
        <div className='container'>
          <div className='hide-on-med-and-down'>
            <button 
              className='btn-large' 
              style={{ display: 'block', margin: '50px auto 10px auto', width: '325px' }}
              onClick={() => this.openModalHandler('emailForm')}>
                <i className='material-icons left'>email</i>Schedule Email Reminder
            </button>
            <button 
              className='btn-large' 
              style={{ display: 'block', margin: '10px auto 50px auto', width: '325px' }}
              onClick={() => this.openModalHandler('smsForm')}>
                <i className='material-icons left'>sms</i>Schedule Text Reminder
            </button>
          </div>
          <ReminderList />
          {modal}
          {buttonGroup}
        </div>
      );
    }

    return content;
  }
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Dashboard);
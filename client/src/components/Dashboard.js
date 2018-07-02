import React, { Component } from 'react';
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

  renderModal() {
    let modal = null;
    if (this.state.showModal) {
      let modalContent = null;
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
    }
    return modal;
  }

  renderButtonGroup() {
    let buttonGroup = null;
    if (!this.state.showModal) {
      buttonGroup = (
        <div 
          style={{ 
            position: 'fixed', 
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column-reverse', 
            right: '23px', 
            bottom: '23px',
            zIndex: '2' }}
          className='hide-on-large-only'>
            <a 
              className='btn-floating btn-large orange' 
              onClick={this.buttonMenuHandler}>
                <i className='material-icons'>add</i>
            </a>
            {this.state.showButtons
              ? <ul>
                  <li style={{ marginBottom: '15px' }}>
                    <a 
                      className="btn-floating orange" 
                      onClick={() => this.openModalHandler('emailForm')}>
                        <i className="material-icons">email</i>
                    </a>
                  </li>
                  <li>
                    <a 
                      className="btn-floating orange"
                      onClick={() => this.openModalHandler('smsForm')}>
                        <i className="material-icons">sms</i>
                    </a>
                  </li>
                </ul>
              : null}
        </div>
      );
    }
    return buttonGroup;
  }

  render() {
    return (
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
        {this.props.auth ? <ReminderList /> : null}
        {this.renderModal()}
        {this.renderButtonGroup()}
      </div>
    );
  }
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Dashboard);
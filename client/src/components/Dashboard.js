import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect} from 'react-redux';

import Modal from './ui/Modal';
import EmailForm from './reminderForms/EmailForm';

class Dashboard extends Component {
  state = {
    showModal: false,
  }

  addButtonHandler = () => {
    this.setState({ showModal: true });
  }

  modalCloseHandler = () => {
    this.setState({ showModal: false });
  }

  render() {
    let content = <Redirect to='/' />;

    if (this.props.auth) {
      content = (
        <div className='container'>
          <button 
            className='btn-large hide-on-med-and-down' 
            style={{ display: 'block', margin: '20px auto 20px auto' }}
            onClick={this.addButtonHandler}>
              Schedule Reminder
          </button>
          {this.state.showModal
            ? <Modal 
                close={this.modalCloseHandler} 
                escaped={this.modalEscapeHandler}>
                  <EmailForm cancelled={this.modalCloseHandler} />
              </Modal>
            : null}
          {this.state.showModal
            ? null
            : <div className='fixed-action-btn'>
                <a 
                  className='btn-floating btn-large red' 
                  onClick={this.addButtonHandler}>
                    <i className='material-icons'>add</i>
                </a>
              </div>}
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
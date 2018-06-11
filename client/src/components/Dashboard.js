import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect} from 'react-redux';

import Modal from './ui/Modal';

class Dashboard extends Component {
  state = {
    showModal: false,
  }

  addButtonHandler = () => {
    this.setState({ showModal: true });
  }

  modalBackdropClickHandler = () => {
    this.setState({ showModal: false });
  }

  modalEscapeHandler = event => {
    if (event.key === 'Escape') {
      this.setState({ showModal: false });
    }
  }

  render() {
    let content = <Redirect to='/' />;

    if (this.props.auth) {


      content = (
        <div className='container'>
          Dashboard
          {this.state.showModal
            ? <Modal 
                clicked={this.modalBackdropClickHandler} 
                escaped={this.modalEscapeHandler}>
                  Hello
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
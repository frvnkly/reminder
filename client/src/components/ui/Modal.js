import React, { Component } from 'react';

import './Modal.css';
import Backdrop from './Backdrop';

class Modal extends Component {
  escKeyHandler = event => {
    if (event.key === 'Escape') {
      this.props.close();
    }
  }

  render() {
    window.onkeydown = this.escKeyHandler;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Backdrop clicked={this.props.close} />
        <div className='Modal'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
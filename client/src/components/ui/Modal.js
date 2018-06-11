import React, { Component } from 'react';

import './Modal.css';
import Backdrop from './Backdrop';

class Modal extends Component {
  render() {
    window.onkeydown = this.props.escaped;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Backdrop clicked={this.props.clicked} />
        <div className='Modal'>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Modal;
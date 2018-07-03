import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginMenu extends Component {
  render() {
    const loginLogout = this.props.auth 
      ? <a href='/auth/logout'>Logout</a> 
      : <a href='/auth/google'>Login</a>;

    const loginLogoutMobile = this.props.auth 
      ? <a href='/auth/logout'>
          <i className="material-icons">more_vert</i>
        </a>
      : <a href='/auth/google'>
          <i className="material-icons">more_vert</i>
        </a>;

    return (
      <React.Fragment>
        <li className='hide-on-med-and-down'>{loginLogout}</li>
        <li className='hide-on-large-only'>{loginLogoutMobile}</li>
      </React.Fragment>
    );
  }
};

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(LoginMenu);
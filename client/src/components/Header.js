import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';

class Header extends Component {
  state = {
    showLoginMenu: false,
    showLogoutMenu: false
  }

  toggleLoginMenuHandler = () => {
    this.setState(prevState => {
      return { showLoginMenu: !prevState.showLoginMenu };
    });
  }

  renderLoginLogout() {
    const loginLogout = this.props.auth 
      ? <a href='/auth/logout'>Logout</a> 
      : <a onClick={this.toggleLoginMenuHandler}>
          Login<i className='material-icons right'>arrow_drop_down</i>
        </a>;

    const loginLogoutMobile = 
      <a onClick={this.toggleLoginMenuHandler}>
        <i className="material-icons">more_vert</i>
      </a>;

    return (
      <React.Fragment>
        <li className='hide-on-med-and-down'>{loginLogout}</li>
        <li className='hide-on-large-only'>{loginLogoutMobile}</li>
      </React.Fragment>
    )
  }

  renderLoginMenu() {
    if (this.state.showLoginMenu) {
      return (
        <React.Fragment>
          <div 
            className='LoginMenuClose' 
            onClick={this.toggleLoginMenuHandler} />
          <div className='LoginMenu white z-depth-1'>
            <ul>
              {this.props.auth
                ? <li><a href='auth/logout'>Logout</a></li>
                : <React.Fragment>
                    <li><a href='/auth/google/'>Login with Google</a></li>
                    <li><a href='/auth/twitter/'>Login with Twitter</a></li>
                  </React.Fragment>}
            </ul>
          </div>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <nav className='orange'>
        <div className='nav-wrapper container'>
          <Link 
            to='/' 
            className='brand-logo' 
            style={{ fontFamily: 'Lobster, cursive' }}>
              Reminder
          </Link>
          <ul className='right'>
            {this.renderLoginLogout()}
          </ul>
          {this.renderLoginMenu()}
        </div>
      </nav>
    );
  }
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(Header);
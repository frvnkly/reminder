import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const header = props => {
  let loginLogout = <a href='/auth/google'>Login</a>;
  if (props.auth) {
    loginLogout = <a href='/auth/logout'>Logout</a>;
  }

  return (
    <nav className='orange'>
      <div className='nav-wrappper container'>
        <Link to='/'className='left brand-logo'>Reminder</Link>
        <ul>
          <li className='right'>
            {loginLogout}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(header);
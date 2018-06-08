import React from 'react';
import { connect } from 'react-redux';

const header = props => {
  let loginLogout = null;
  switch(props.auth) {
    case null:
      break;
    case false:
      loginLogout = <a href='/auth/google'>Login</a>;
      break;
    default:
      loginLogout = <a href='/auth/logout'>Logout</a>;
  }

  return (
    <nav className='orange'>
      <div className='nav-wrappper container'>
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
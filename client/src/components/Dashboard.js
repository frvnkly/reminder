import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect} from 'react-redux';

const dashboard = props => {
  let content = <Redirect to='/' />;

  if (props.auth) {
    content = (
      <div className='container'>
        Dashboard
        <div className='fixed-action-btn'>
          <a className='btn-floating btn-large red'>
            <i className='material-icons'>add</i>
          </a>
        </div>
      </div>
    );
  }

  return content;
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(dashboard);
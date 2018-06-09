import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const landing = props => {
  if (!(props.auth === false)) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <div className='container'>
      Landing
    </div>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(landing);
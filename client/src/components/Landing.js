import React from 'react';
import { connect } from 'react-redux';

const landing = props => {
  return (
    !(props.auth)
    ? <div className='container center-align'>
        <h2>Reminder</h2>
        <p>Schedule an email or text reminder!</p>
      </div>
    : null
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    auth,
  };
};

export default connect(mapStateToProps)(landing);
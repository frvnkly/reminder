import React from 'react';

const submitError = props => {
  return (
    <div className='red-text'>
      <i className='material-icons large'>error</i>
      <p>Error - couldn't schedule reminder.</p>
      <br />
      <a className='btn' onClick={props.confirmed}>Ok</a>
    </div>
  );
}

export default submitError;
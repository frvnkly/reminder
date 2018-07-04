import React from 'react';

const submitSuccess = props => {
  return (
    <div className='green-text'>
      <i className='material-icons large'>done</i>
      <p>Reminder scheduled!</p>
      <br />
      <a className='btn' onClick={props.confirmed}>Ok</a>
    </div>
  );
}

export default submitSuccess;
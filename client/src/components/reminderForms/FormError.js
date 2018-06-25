import React from 'react';

const formError = props => {
  if (props.errors.length === 0) {
    return null;
  }

  const css = {
    // textAlign: 'left',
    marginTop: '0',
    paddingTop: '0',
  };
  return <p className='red-text' style={css}>{props.errors[0]}</p>
};

export default formError;
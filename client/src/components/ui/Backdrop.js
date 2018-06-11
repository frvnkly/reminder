import React from 'react';

const backdrop = props => {
  return (
    <div 
      style={{
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        opacity: '0.5',
        zIndex: '100',
      }}
      onClick={props.clicked} />
  );
};

export default backdrop;
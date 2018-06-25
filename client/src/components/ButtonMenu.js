import React from 'react';

const buttonMenu = props => {
  const menuCss = {
    position: 'fixed', 
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column-reverse', 
    right: '23px', 
    bottom: '23px'
  };

  const innerBtnCss = {
    marginBottom: '15px',
  }

  return (
    <div style={menuCss}>
        <a 
          className='btn-floating btn-large red' 
          onClick={}>
            <i className='material-icons'>add</i>
        </a>
        <ul>
          <li style={innerBtnCss}>
            <a className="btn-floating red">
              <i className="material-icons">email</i>
            </a>
          </li>
          <li style={innerBtnCss}>
            <a className="btn-floating red">
              <i className="material-icons">sms</i>
            </a>
          </li>
        </ul>
    </div>
  );
};

export default buttonMenu;
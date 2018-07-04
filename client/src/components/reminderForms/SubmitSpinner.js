import React from 'react';

const submitSpinner = props => {
  return (
    <div>
      <div className="preloader-wrapper medium active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
      <p>Submitting</p>
    </div>
  );
}

export default submitSpinner;
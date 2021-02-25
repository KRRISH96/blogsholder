import * as React from 'react';
import './loaderStyles.scss';

const Loader = ({ statusText = 'Loading...' }) => (
  <div className="blocker-container">
    <div className="blocker-icons-container card">
      <span className="spinner" />
      <span className="spinner-text">{statusText} Hang Tight!</span>
    </div>
  </div>
);

export default Loader;

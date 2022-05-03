import React from 'react';

import styles from './LoadingSpinner.module.css';

const LoadingSpinner = props => {
  return (
    <div className={`${props.asOverlay && styles['loading-spinner__overlay']}`}>
      <div className={styles['lds-dual-ring']}></div>
    </div>
  );
};

export default LoadingSpinner;

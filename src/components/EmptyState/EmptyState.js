import React from 'react';
import styles from './EmptyState.module.css';

const EmptyState = ({ message, icon }) => {
  return (
    <div className={styles.emptyState}>
      {icon && <div className={styles.icon}>{icon}</div>}
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default EmptyState;


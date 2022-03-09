import React from 'react';
import styles from '@/styles/scss/Banner.module.scss';

export default function Banner({ buttonText }) {
  return (
    <div className={styles.container}>
      <h1>Coffee Connoisseur</h1>
      <p>Subtitle</p>
      <button type="button" className="btn">{buttonText}</button>
    </div>
  );
}

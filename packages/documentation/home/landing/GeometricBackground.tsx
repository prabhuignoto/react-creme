import styles from './styles/geometric-background.module.scss';

const GeometricBackground = () => {
  return (
    <div className={styles['geometric-background']}>
      <div className={styles.triangle}></div>
      <div className={styles.triangle}></div>
      <div className={styles.triangle}></div>
      <div className={styles.triangle}></div>
      <div className={styles.square}></div>
      <div className={styles.square}></div>
    </div>
  );
};

export default GeometricBackground;

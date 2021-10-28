import styles from "./BasketBall.module.css";

const BasketBall = () => {
  return (
    <div className={styles.ball}>
      <div className={styles.line1} />
      <div className={styles.line2} />
    </div>
  );
};

export default BasketBall;

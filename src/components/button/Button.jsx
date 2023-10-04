import styles from './Button.module.css';

export const Button = ({ onClick }) => {
  return (
    <button className={styles.Button} onClick={onClick}>
      Load more
    </button>
  );
};

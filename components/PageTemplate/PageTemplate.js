import styles from "./styles.module.css";

export default function PageTemplate({ children }) {
  return (
    <main className={styles.main}>
      {children}
    </main>
  );
}

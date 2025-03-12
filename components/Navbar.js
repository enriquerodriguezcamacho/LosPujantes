import Link from "next/link";
import styles from "../styles/navbar.module.css";

export default function Navbar({ usuario }) {
  return (
    <nav className={styles.navbar}>
      <Link href="/subastas">
        <h1>Subastas Online</h1>
      </Link>
      <div>
        {usuario ? (
          <span className={styles.welcome}>Bienvenido, {usuario}</span>
        ) : (
          <>
            <Link href="/login">Iniciar Sesión</Link>
            <Link href="/registro">Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}

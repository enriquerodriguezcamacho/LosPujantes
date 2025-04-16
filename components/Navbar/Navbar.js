"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsuario(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("access");
    setUsuario(null);
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Los Pujantes
      </Link>

      <div className={styles.navLinks}>
        <Link href="/auctions">Subastas</Link>

        {usuario ? (
          <>
            <Link href="/user">
              <button className={styles.userButton}>👤 {usuario}</button>
            </Link>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Iniciar Sesión</Link>
            <Link href="/register">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
}

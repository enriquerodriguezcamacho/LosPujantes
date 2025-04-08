"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";

export default function Navbar() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsuario(storedUser);
    }
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Los Pujantes
      </Link>
      <div className={styles.navLinks}>
        <Link href="/auctions">Subastas</Link>
        {usuario ? (
          <Link href="/user">
            <button className={styles.userButton}>👤 {usuario}</button>
          </Link>
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

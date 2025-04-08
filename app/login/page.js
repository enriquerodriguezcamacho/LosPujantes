"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import InitTemplate from "@/components/InitTemplate/InitTemplate";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("https://das-p2-backend.onrender.com/api/users/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.access);
      localStorage.setItem("username", data.username);
      router.push("/auctions");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <InitTemplate>
      <div className={styles.formWrapper}>
        <div className={styles.formContainer}>
        <h2 className={styles.titulo}>Iniciar Sesión</h2>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Usuario:</label>
              <input
                type="text"
                className={styles.inputField}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Contraseña:</label>
              <input
                type="password"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.btnSubmit}>
              Iniciar Sesión
            </button>
          </form>
          <p className={styles.registerRedirect}>
            ¿No tienes una cuenta?{" "}
            <Link href="/register">Regístrate aquí</Link>
          </p>
        </div>
      </div>
    </InitTemplate>
  );
}

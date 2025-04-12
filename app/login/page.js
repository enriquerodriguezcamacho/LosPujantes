"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import InitTemplate from "@/components/InitTemplate/InitTemplate";
import styles from "./page.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        setError("Credenciales inválidas.");
        return;
      }

      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("username", credentials.username);
      router.push("/auctions");
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <InitTemplate>
      <div className={styles.formContainer}>
        <h1>Iniciar Sesión</h1>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            name="username"
            type="text"
            placeholder="Usuario"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </InitTemplate>
  );
}

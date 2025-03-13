"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/form.module.css";

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
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("username", data.username);
      router.push("/subastas");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h2>Iniciar Sesión</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Usuario:</label>
            <input type="text" className={styles.inputField} value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña:</label>
            <input type="password" className={styles.inputField} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className={styles.btnSubmit}>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

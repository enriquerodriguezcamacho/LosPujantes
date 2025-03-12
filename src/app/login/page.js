"use client";
import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useRouter } from "next/navigation";
import styles from "../../styles/form.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const response = await loginUser({ email, password });

    if (response) {
      alert("Inicio de sesión exitoso");
      router.push("/subastas");
    } else {
      setError("Credenciales incorrectas, intenta de nuevo.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h2>Iniciar Sesión</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.btnSubmit}>Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
}

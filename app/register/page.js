"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import InitTemplate from "@/components/InitTemplate/InitTemplate";
import styles from "./page.module.css";
import Link from "next/link";
import { registerUser } from "./utils";

export default function RegisterPage() {
  const router = useRouter();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    birth_date: "",
    locality: "",
    municipality: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);

    const result = await registerUser(userData);

    if (result.error) {
      setError(result.error);
    } else {
      setMessage("Registro exitoso. Redirigiendo a login...");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <InitTemplate>
      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
          <h2>Registro</h2>
          {message && <p className={styles.successMessage}>{message}</p>}
          {error && <p className={styles.errorMessage}>{error}</p>}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Usuario:</label>
              <input type="text" name="username" value={userData.username} onChange={handleChange} required className={styles.inputField} />
            </div>
            <div className={styles.formGroup}>
              <label>Correo Electrónico:</label>
              <input type="email" name="email" value={userData.email} onChange={handleChange} required className={styles.inputField} />
            </div>
            <div className={styles.formGroup}>
              <label>Contraseña:</label>
              <input type="password" name="password" value={userData.password} onChange={handleChange} required className={styles.inputField} />
            </div>
            <div className={styles.formGroup}>
              <label>Nombre:</label>
              <input type="text" name="first_name" value={userData.first_name} onChange={handleChange} required className={styles.inputField} />
            </div>
            <div className={styles.formGroup}>
              <label>Apellido:</label>
              <input type="text" name="last_name" value={userData.last_name} onChange={handleChange} required className={styles.inputField} />
            </div>
            <div className={styles.formGroup}>
              <label>Fecha de Nacimiento:</label>
              <input type="date" name="birth_date" value={userData.birth_date} onChange={handleChange} required className={styles.inputField} />
            </div>
            <div className={styles.formGroup}>
              <label>Localidad:</label>
              <input type="text" name="locality" value={userData.locality} onChange={handleChange} required className={styles.inputField} />
            </div>
            <div className={styles.formGroup}>
              <label>Municipio:</label>
              <input type="text" name="municipality" value={userData.municipality} onChange={handleChange} required className={styles.inputField} />
            </div>
            <button type="submit" className={styles.btnSubmit}>Registrarse</button>
          </form>

          <p className={styles.loginRedirect}>
            ¿Ya tienes una cuenta? <Link href="/login">Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </InitTemplate>
  );
}

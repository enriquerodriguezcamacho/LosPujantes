"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import InitTemplate from "@/components/InitTemplate/InitTemplate";
import styles from "./page.module.css";

export default function RegisterPage() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    username: "", email: "", password: "",
    first_name: "", last_name: "",
    birth_date: "", locality: "", municipality: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError("Error en el registro.");
        return;
      }

      setMessage("Registro exitoso. Redirigiendo...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <InitTemplate>
      <div className={styles.formContainer}>
        <h1>Registro</h1>
        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="username" placeholder="Usuario" onChange={handleChange} required />
          <input name="email" placeholder="Correo" type="email" onChange={handleChange} required />
          <input name="password" placeholder="Contraseña" type="password" onChange={handleChange} required />
          <input name="first_name" placeholder="Nombre" onChange={handleChange} required />
          <input name="last_name" placeholder="Apellido" onChange={handleChange} required />
          <input name="birth_date" type="date" onChange={handleChange} required />
          <input name="locality" placeholder="Localidad" onChange={handleChange} required />
          <input name="municipality" placeholder="Municipio" onChange={handleChange} required />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </InitTemplate>
  );
}

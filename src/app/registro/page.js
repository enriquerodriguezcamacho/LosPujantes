"use client";
import { useState } from "react";
import { registerUser } from "../../services/authService";
import styles from "../../styles/form.module.css";

export default function RegisterPage() {
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
    setUserData(
      { ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);

    console.log("Datos enviados al backend:", userData);

    const result = await registerUser(userData);
    if (result) {
      setMessage("Registro exitoso");
      setUserData({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        locality: "",
        municipality: "",
      });
    } else {
      setError("Error en el registro. Verifica los datos e intenta nuevamente.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <h2>Registro</h2>
        {message && <p className={styles.successMessage}>{message}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Usuario:</label>
            <input type="text" name="username" placeholder="Usuario" onChange={handleChange} value={userData.username} required className={styles.inputField} />
          </div>
          <div className={styles.formGroup}>
            <label>Correo Electrónico:</label>
            <input type="email" name="email" placeholder="Correo Electrónico" onChange={handleChange} value={userData.email} required className={styles.inputField} />
          </div>
          <div className={styles.formGroup}>
            <label>Contraseña:</label>
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} value={userData.password} required className={styles.inputField} />
          </div>
          <div className={styles.formGroup}>
            <label>Nombre:</label>
            <input type="text" name="first_name" placeholder="Nombre" onChange={handleChange} value={userData.first_name} required className={styles.inputField} />
          </div>
          <div className={styles.formGroup}>
            <label>Apellido:</label>
            <input type="text" name="last_name" placeholder="Apellido" onChange={handleChange} value={userData.last_name} required className={styles.inputField} />
          </div>
          <div className={styles.formGroup}>
            <label>Fecha de Nacimiento:</label>
            <input type="date" name="birth_date" onChange={handleChange} value={userData.birth_date} required className={styles.inputField} />
          </div>
          <div className={styles.formGroup}>
            <label>Localidad:</label>
            <input type="text" name="locality" placeholder="Localidad" onChange={handleChange} value={userData.locality} required className={styles.inputField} />
          </div>
          <div className={styles.formGroup}>
            <label>Municipio:</label>
            <input type="text" name="municipality" placeholder="Municipio" onChange={handleChange} value={userData.municipality} required className={styles.inputField} />
          </div>
          <button type="submit" className={styles.btnSubmit}>Registrarse</button>
        </form>
      </div>
    </div>
  );
}
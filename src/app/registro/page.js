"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/form.module.css";

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

  // Maneja cambios en los inputs
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Función para formatear la fecha en YYYY-MM-DD
  const formatBirthDate = (date) => {
    if (!date) return null;
    return date.split("/").reverse().join("-");
  };

  // Manejo del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError(null);

    const formattedDate = formatBirthDate(userData.birth_date);

    // 🔍 Verificar los datos antes de enviarlos
    console.log("Datos enviados al backend:", { ...userData, birth_date: formattedDate });

    try {
      const response = await fetch("https://das-p2-backend.onrender.com/api/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          first_name: userData.first_name,
          last_name: userData.last_name,
          birth_date: formattedDate,
          locality: userData.locality,
          municipality: userData.municipality,
        }),
      });

      const data = await response.json();
      console.log("Respuesta del backend:", data); // 🔍 Ver respuesta exacta

      if (!response.ok) {
        throw new Error(data.detail || "Error en el registro. Verifica los datos.");
      }

      setMessage("Registro exitoso. Redirigiendo a login...");
      setTimeout(() => router.push("/login"), 2000);
      
    } catch (err) {
      console.error("Error en el registro:", err.message);
      setError(err.message);
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

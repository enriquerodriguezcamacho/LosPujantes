"use client";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../services/authService"; // Importa correctamente
import styles from "../../styles/user.module.css";

export default function UserPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile().then(setUser);
  }, []);

  return (
    <div className={styles.userContainer}>
      <h2>Perfil de Usuario</h2>
      {user ? (
        <div>
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className={styles.logoutButton} onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <p>No has iniciado sesión.</p>
      )}
    </div>
  );
}

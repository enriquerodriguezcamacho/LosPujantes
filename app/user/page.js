"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/user.module.css";

export default function UserPage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("https://das-p2-backend.onrender.com/api/users/profile/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("accessToken");
        router.push("/login");
      });
  }, []);

  return (
    <div className={styles.userContainer}>
      <h2>Perfil de Usuario</h2>
      {user ? (
        <div>
          <p><strong>Usuario:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className={styles.logoutButton} onClick={() => {
            localStorage.removeItem("accessToken");
            setUser(null);
            router.push("/login");
          }}>
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <p>Cargando datos del usuario...</p>
      )}
    </div>
  );
}

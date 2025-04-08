"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InitTemplate from "@/components/InitTemplate/InitTemplate";
import styles from "./page.module.css";

export default function UserPage() {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("username");
    if (!user) {
      router.push("/login");
    } else {
      setUsername(user);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    router.push("/login");
  };

  return (
    <InitTemplate>
      <div className={styles.userContainer}>
        {username ? (
          <>
            <p className={styles.welcomeText}>Bienvenido, <strong>{username}</strong></p>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </InitTemplate>
  );
}

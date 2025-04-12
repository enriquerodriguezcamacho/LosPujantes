"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/services/api";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Card from "@/components/Card/Card";
import styles from "./page.module.css";

export default function UserPage() {
  const [subastas, setSubastas] = useState([]);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (!storedUser) {
      router.push("/login");
    } else {
      setUsername(storedUser);
      fetchUserAuctions();
    }
  }, []);

  const fetchUserAuctions = async () => {
    try {
      const data = await apiFetch("http://127.0.0.1:8000/api/auctions/mis-subastas/");
      setSubastas(data);
    } catch (error) {
      console.error("Error al obtener subastas del usuario:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  return (
    <PageTemplate>
      <div className={styles.container}>
        <h1 className={styles.title}>Perfil de {username}</h1>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Cerrar sesión
        </button>
        <h2 className={styles.subtitle}>Mis Subastas</h2>
        {subastas.length === 0 ? (
          <p>No has creado ninguna subasta.</p>
        ) : (
          <div className={styles.grid}>
            {subastas.map((subasta) => (
              <Card key={subasta.id}>
                <h3>{subasta.title}</h3>
                <p>{subasta.description}</p>
                <p>Precio: {subasta.price}€</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageTemplate>
  );
}

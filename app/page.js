"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import InitTemplate from "@/components/InitTemplate/InitTemplate";
import Card from "@/components/Card/Card";
import Link from "next/link";
import subastasData from "@/data/subastas";

export default function HomePage() {
  const [subastas, setSubastas] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setSubastas(subastasData);
    const storedUser = localStorage.getItem("username");
    if (storedUser) setUsername(storedUser);
  }, []);

  return (
    <InitTemplate>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Bienvenido a Subastas Online{" "}
          {username && (
            <Link href="/user">
              <button className={styles.userButton}>{username}</button>
            </Link>
          )}
        </h1>
        <h2 className={styles.subtitle}>Subastas Destacadas</h2>

        <div className={styles.grid}>
          {subastas.length === 0 ? (
            <p>No hay subastas disponibles.</p>
          ) : (
            subastas.map((subasta) => (
              <Card key={subasta.id}>
                <img
                  src={subasta.imagen}
                  alt={subasta.nombre}
                  className={styles.image}
                />
                <h3>{subasta.nombre}</h3>
                <p>{subasta.descripcion}</p>
                <p><strong>Precio actual:</strong> {subasta.precio}</p>
                <Link href={`/auctions/${subasta.id}`}>
                  <button className={styles.button}>Ver detalles</button>
                </Link>
              </Card>
            ))
          )}
        </div>
      </div>
    </InitTemplate>
  );
}

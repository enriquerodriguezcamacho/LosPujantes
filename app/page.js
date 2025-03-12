"use client";
import { useEffect, useState } from "react";
import { getSubastas } from "../services/subastasService";
import styles from "../styles/page.module.css";
import Link from "next/link";

export default function HomePage() {
  const [subastas, setSubastas] = useState([]);

  useEffect(() => {
    getSubastas().then(setSubastas);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Bienvenido a Subastas Online</h1>
      <h2>Subastas Destacadas</h2>
      {subastas.length === 0 ? (
        <p className={styles.noSubastas}>No hay subastas disponibles en este momento.</p>
      ) : (
        <div className={styles.subastaGrid}>
          {subastas.map((subasta) => (
            <div key={subasta.id} className={styles.subastaCard}>
              <img src={subasta.imagen} alt={subasta.nombre} className={styles.subastaImg} />
              <h3>{subasta.nombre}</h3>
              <p>{subasta.descripcion}</p>
              <p><strong>Precio actual:</strong> {subasta.precio}</p>
              <Link href={`/subastas/${subasta.id}`}>
                <button className={styles.verDetalles}>Ver detalles</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

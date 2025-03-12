"use client";
import { useEffect, useState } from "react";
import { getSubastas } from "../../services/subastasService";
import { getUserProfile } from "../../services/authService"; // Asegúrate de importar correctamente
import styles from "../../styles/page.module.css";

export default function SubastasPage() {
  const [subastas, setSubastas] = useState([]);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    getSubastas().then(setSubastas);
    
    // Obtener perfil de usuario
    getUserProfile().then((user) => {
      if (user) {
        setUsuario(user);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <h1>Subastas Disponibles</h1>
      {usuario && <p>Bienvenido, {usuario.nombre}</p>}
      
      <div className={styles.subastaGrid}>
        {subastas.length === 0 ? (
          <p className={styles.noSubastas}>No hay subastas disponibles en este momento.</p>
        ) : (
          subastas.map((subasta) => (
            <div key={subasta.id} className={styles.subastaCard}>
              <img src={subasta.imagen} alt={subasta.nombre} className={styles.subastaImg} />
              <h3>{subasta.nombre}</h3>
              <p>{subasta.descripcion}</p>
              <p><strong>Precio actual:</strong> {subasta.precio}</p>
              <a href={`/subastas/${subasta.id}`} className={styles.verDetalles}>Ver detalles</a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

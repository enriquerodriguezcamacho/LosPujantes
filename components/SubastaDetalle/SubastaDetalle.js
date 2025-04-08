import React from "react";
import styles from "./styles.module.css";

const SubastaDetalle = ({ subasta, puja, setPuja, onPujar }) => {
  return (
    <div className={styles.container}>
      <img src={subasta.imagen} alt={subasta.nombre} className={styles.imagen} />
      <h1>{subasta.nombre}</h1>
      <p>{subasta.descripcion}</p>
      <p className={styles.precio}><strong>Precio actual:</strong> {subasta.precio}</p>
      <input
        type="number"
        placeholder="Introduce tu puja"
        value={puja}
        onChange={(e) => setPuja(e.target.value)}
        className={styles.pujaInput}
      />
      <button className={styles.pujarBoton} onClick={onPujar}>Pujar</button>
    </div>
  );
};

export default SubastaDetalle;

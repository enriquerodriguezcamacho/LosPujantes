"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export default function SubastaDetalle({ subasta, onPujar }) {
  const [puja, setPuja] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!puja || Number(puja) <= 0) {
      alert("Introduce una puja válida.");
      return;
    }
    onPujar(puja);
    setPuja("");
  };

  return (
    <div className={styles.container}>
      <img
        src={subasta.thumbnail}
        alt={subasta.title}
        className={styles.image}
      />
      <h2>{subasta.title}</h2>
      <p><strong>Descripción:</strong> {subasta.description}</p>
      <p><strong>Precio actual:</strong> {subasta.price}€</p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          min="1"
          value={puja}
          onChange={(e) => setPuja(e.target.value)}
          placeholder="Introduce tu puja"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Pujar
        </button>
      </form>
    </div>
  );
}

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import subastasData from "@/data/subastas";
import Card from "@/components/Card/Card";
import styles from "./page.module.css";

export default function AuctionDetail() {
  const { id } = useParams();
  const [subasta, setSubasta] = useState(null);
  const [puja, setPuja] = useState("");

  useEffect(() => {
    const found = subastasData.find((item) => item.id === parseInt(id));
    setSubasta(found);
  }, [id]);

  const handlePujar = () => {
    if (!puja || Number(puja) <= 0) {
      alert("Introduce una puja válida.");
      return;
    }
    alert(`Has pujado ${puja}€ en "${subasta.nombre}"`);
    setPuja("");
  };

  if (!subasta) return <p>Cargando subasta...</p>;

  return (
    <Card>
      <h2>{subasta.nombre}</h2>
      <img src={subasta.imagen} alt={subasta.nombre} className={styles.image} />
      <p><strong>Descripción:</strong> {subasta.descripcion}</p>
      <p><strong>Precio actual:</strong> {subasta.precio}</p>
      <input
        type="number"
        value={puja}
        placeholder="Introduce tu puja"
        onChange={(e) => setPuja(e.target.value)}
        className={styles.input}
      />
      <button onClick={handlePujar} className={styles.button}>Pujar</button>
    </Card>
  );
}

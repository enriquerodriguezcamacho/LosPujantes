"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSubastas } from "../../../services/subastasService";
import styles from "../../../styles/subasta.module.css";

export default function SubastaPage() {
  const params = useParams();
  const id = params.id;
  const [subasta, setSubasta] = useState(null);
  const [puja, setPuja] = useState("");

  useEffect(() => {
    getSubastas().then((subastas) => {
      const subastaEncontrada = subastas.find((s) => s.id === Number(id));
      setSubasta(subastaEncontrada);
    });
  }, [id]);

  if (!subasta) return <p>Cargando...</p>;

  return (
    <div className={styles.subastaContainer}>
      <img src={subasta.imagen} alt={subasta.nombre} className={styles.imagen} />
      <h1>{subasta.nombre}</h1>
      <p>{subasta.descripcion}</p>
      <p className={styles.precio}>{subasta.precio}</p>
      <input
        type="number"
        placeholder="Introduce tu puja"
        value={puja}
        onChange={(e) => setPuja(e.target.value)}
      />
      <button className={styles.pujarBoton}>Pujar</button>
    </div>
  );
}

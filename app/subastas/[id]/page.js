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

    const handlePujar = () => {
        if (!puja || puja <= 0) {
            alert("Introduce una puja válida.");
            return;
        }
        alert(`Has pujado ${puja} en ${subasta.nombre}. ¡Suerte!`);
        setPuja("");
    };

    if (!subasta) return <p className={styles.cargando}>Cargando...</p>;

    return (
        <div className={styles.subastaContainer}>
            <div className={styles.subastaCard}>
                <img src={subasta.imagen} alt={subasta.nombre} className={styles.imagen} />
                <div className={styles.detalles}>
                    <h1>{subasta.nombre}</h1>
                    <p className={styles.descripcion}>{subasta.descripcion}</p>
                    <p className={styles.precio}><strong>Precio actual:</strong> ${subasta.precio}</p>
                    
                    <div className={styles.pujaContainer}>
                        <input
                            type="number"
                            placeholder="Introduce tu puja"
                            value={puja}
                            onChange={(e) => setPuja(e.target.value)}
                            className={styles.pujaInput}
                        />
                        <button className={styles.pujarBoton} onClick={handlePujar}>Pujar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import styles from "../styles/subastaItem.module.css";

export default function SubastaItem({ subasta }) {
  return (
    <div className={styles.card}>
      <img src={subasta.imagen} alt={subasta.nombre} className={styles.image} />
      <h3>{subasta.nombre}</h3>
      <p>{subasta.descripcion}</p>
      <p><strong>Precio inicial:</strong> {subasta.precio}</p>
      <button>Pujar</button>
    </div>
  );
}

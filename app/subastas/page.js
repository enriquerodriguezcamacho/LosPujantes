"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSubastas } from "../../services/subastasService";
import { getUserProfile } from "../../services/authService";
import styles from "../../styles/subasta.module.css";

export default function SubastasPage() {
    const router = useRouter();
    const [subastas, setSubastas] = useState([]);
    const [filteredSubastas, setFilteredSubastas] = useState([]);
    const [username, setUsername] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        getSubastas().then((data) => {
            setSubastas(data);
            setFilteredSubastas(data);
        });

        // Obtener perfil del usuario desde el backend
        getUserProfile().then((user) => {
            if (user && user.username) {
                setUsername(user.username);
            }
        }).catch(() => {
            setUsername(null);
        });
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = subastas.filter(subasta =>
            subasta.nombre.toLowerCase().includes(query) || 
            subasta.descripcion.toLowerCase().includes(query)
        );
        setFilteredSubastas(filtered);
    };

    return (
        <main className={styles.mainSubastas}>
            <header className={styles.header}>
                <h1>Bienvenido a las Subastas</h1>
                {username && (
                    <button 
                        className={styles.ctaButtonUser} 
                        onClick={() => router.push("/user")}
                    >
                        Bienvenido, {username}
                    </button>
                )}
            </header>

            <section className={styles.searchContainer}>
                <input 
                    type="text"
                    placeholder="Buscar subasta..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </section>

            <section className={styles.subastasContainer}>
                <h2>Subastas Disponibles</h2>
                <div className={styles.subastasGrid}>
                    {filteredSubastas.length === 0 ? (
                        <p className={styles.noSubastas}>No hay subastas disponibles en este momento.</p>
                    ) : (
                        filteredSubastas.map((subasta) => (
                            <article key={subasta.id} className={styles.subastaItem}>
                                <img src={subasta.imagen} alt={subasta.nombre} />
                                <h3>{subasta.nombre}</h3>
                                <p>{subasta.descripcion}</p>
                                <p><strong>Precio actual:</strong> {subasta.precio}</p>
                                <button 
                                    onClick={() => router.push(`/subastas/${subasta.id}`)} 
                                    className={styles.verDetalles}
                                >
                                    Ver Detalles
                                </button>
                            </article>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}

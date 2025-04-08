"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import Card from "@/components/Card/Card";
import Link from "next/link";
import subastasData from "@/data/subastas";

export default function AuctionsPage() {
  const [subastas, setSubastas] = useState([]);
  const [filteredSubastas, setFilteredSubastas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSubastas(subastasData);
    setFilteredSubastas(subastasData);
  }, []);

  useEffect(() => {
    const filtered = subastas.filter((subasta) =>
      subasta.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubastas(filtered);
  }, [searchTerm, subastas]);

  return (
    <PageTemplate>
      <div className={styles.container}>
        <h2 className={styles.subTitle}>Subastas Disponibles</h2>

        <input
          type="text"
          className={styles.searchBar}
          placeholder="Buscar subasta..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={styles.grid}>
          {filteredSubastas.length === 0 ? (
            <p>No hay subastas disponibles</p>
          ) : (
            filteredSubastas.map((subasta) => (
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
                  <button className={styles.button}>Ver Detalles</button>
                </Link>
              </Card>
            ))
          )}
        </div>
      </div>
    </PageTemplate>
  );
}

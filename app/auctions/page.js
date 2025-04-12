"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Card from "@/components/Card/Card";
import Link from "next/link";
import { getAuctions, getCategories } from "./utils";

export default function AuctionsPage() {
  const [subastas, setSubastas] = useState([]);
  const [filteredSubastas, setFilteredSubastas] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await getAuctions();
      setSubastas(data);
      setFilteredSubastas(data);

      const cats = await getCategories();
      setCategories(cats);
    };
    loadData();
  }, []);

  useEffect(() => {
    filtrarSubastas();
  }, [search, minPrice, maxPrice, selectedCategory, subastas]);

  const filtrarSubastas = () => {
    let resultados = subastas;

    if (search.trim() !== "") {
      resultados = resultados.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategory) {
      resultados = resultados.filter((s) => s.category === parseInt(selectedCategory));
    }

    if (minPrice) {
      resultados = resultados.filter((s) => parseFloat(s.price) >= parseFloat(minPrice));
    }

    if (maxPrice) {
      resultados = resultados.filter((s) => parseFloat(s.price) <= parseFloat(maxPrice));
    }

    setFilteredSubastas(resultados);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.subTitle}>Subastas Disponibles</h1>

      <input
        className={styles.searchBar}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar subasta..."
      />

      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="minPrice">Precio mínimo:</label>
          <input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="maxPrice">Precio máximo:</label>
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="category">Categoría:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas</option>
            {Array.isArray(categories) &&
              categories.map((cat) => (
                <option key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredSubastas.length === 0 ? (
          <p>No hay subastas disponibles.</p>
        ) : (
          filteredSubastas.map((subasta) => (
            <Card key={subasta.id}>
              <img
                src={subasta.thumbnail}
                alt={subasta.title}
                className={styles.image}
              />
              <h3>{subasta.title}</h3>
              <p>{subasta.description}</p>
              <p><strong>Precio:</strong> {subasta.price}€</p>
              <Link href={`/auctions/${subasta.id}`}>
                <button className={styles.button}>Ver Detalles</button>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

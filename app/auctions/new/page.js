"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PageTemplate from "@/components/PageTemplate/PageTemplate";
import styles from "./page.module.css";

export default function NewAuctionPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    thumbnail: "",
    closing_date: "",
    category: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    const response = await fetch("http://127.0.0.1:8000/api/auctions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Subasta creada con éxito.");
      router.push("/auctions");
    } else {
      alert("Error al crear la subasta.");
    }
  };

  return (
    <PageTemplate>
      <div className={styles.container}>
        <h1>Crear Nueva Subasta</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input name="title" placeholder="Título" onChange={handleChange} required />
          <textarea name="description" placeholder="Descripción" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Precio" onChange={handleChange} required />
          <input name="stock" type="number" placeholder="Stock" onChange={handleChange} required />
          <input name="brand" placeholder="Marca" onChange={handleChange} required />
          <input name="thumbnail" placeholder="URL de la imagen" onChange={handleChange} required />
          <input name="closing_date" type="datetime-local" onChange={handleChange} required />
          <input name="category" type="number" placeholder="ID Categoría" onChange={handleChange} required />
          <button type="submit">Crear</button>
        </form>
      </div>
    </PageTemplate>
  );
}

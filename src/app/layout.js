"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getUserProfile } from "../services/authService"; 
import "./global.css";

export default function RootLayout({ children }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (!token) return; // Evita llamadas innecesarias al backend

      const user = await getUserProfile();
      if (user) {
        setUsuario(user.username);
      }
    }
    fetchUser();
  }, []);

  return (
    <html lang="es">
      <body>
        <Navbar usuario={usuario} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

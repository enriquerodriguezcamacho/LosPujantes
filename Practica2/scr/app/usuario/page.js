"use client";
import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const API_URL = "https://das-p2-backend.onrender.com/api/users/profile";

export default function UsuarioPage() {
  const [userData, setUserData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUserData(res.data))
      .catch((err) => console.error("Error al cargar perfil", err));
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put(API_URL, userData, { headers: { Authorization: `Bearer ${token}` } });
      alert("Perfil actualizado.");
    } catch (error) {
      alert("Error al actualizar perfil.");
    }
  };

  if (!userData) return <Typography>Cargando...</Typography>;

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h4">Perfil</Typography>
      {Object.keys(userData).map((key) => (
        <TextField key={key} name={key} label={key} fullWidth sx={{ mt: 2 }} value={userData[key]} onChange={(e) => setUserData({ ...userData, [key]: e.target.value })} />
      ))}
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleUpdate}>
        Actualizar
      </Button>
    </Box>
  );
}

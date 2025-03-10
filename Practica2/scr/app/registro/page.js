"use client";
import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    if (nombre && email && password) {
      alert("Registro exitoso");
      router.push("/inicio");
    } else {
      alert("Por favor, completa todos los campos");
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h4">Registro</Typography>
      <TextField label="Nombre" fullWidth sx={{ mt: 2 }} value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <TextField label="Correo" fullWidth sx={{ mt: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Contraseña" type="password" fullWidth sx={{ mt: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>
        Registrarse
      </Button>
    </Box>
  );
}

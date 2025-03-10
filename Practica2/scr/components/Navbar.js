"use client"; // Asegura que el componente es interactivo
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => router.push("/")}>
          Subastas Online
        </Typography>
        <Button color="inherit" onClick={() => router.push("/inicio")}>Iniciar Sesión</Button>
        <Button color="inherit" onClick={() => router.push("/registro")}>Registro</Button>
      </Toolbar>
    </AppBar>
  );
}

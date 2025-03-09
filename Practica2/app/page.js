"use client";
import { Typography, Button, Box } from "@mui/material";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <Box sx={{ textAlign: "center", p: 4 }}>
      <Typography variant="h3">Bienvenido a Subastas Online</Typography>
      <Button variant="contained" onClick={() => router.push("/subastas")} sx={{ mt: 2 }}>
        Ver Subastas
      </Button>
    </Box>
  );
}

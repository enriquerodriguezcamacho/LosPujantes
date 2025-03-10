"use client";
import { useParams } from "next/navigation";
import { Box, Typography, Button, CardMedia } from "@mui/material";

const subastas = {
  rolex: { nombre: "Reloj Rolex Submariner", precio: 15000, imagen: "/img/rolex.jpg", descripcion: "Un lujoso reloj de buceo de Rolex." },
  chaqueta: { nombre: "Chaqueta Polo Ralph Lauren", precio: 300, imagen: "/img/chaqueta.jpg", descripcion: "Chaqueta clásica de Polo Ralph Lauren, ideal para cualquier ocasión." },
  iphone: { nombre: "iPhone 16", precio: 1200, imagen: "/img/iphone.jpg", descripcion: "El último iPhone con tecnología avanzada." },
};

export default function DetalleSubasta() {
  const { id } = useParams();
  const subasta = subastas[id];

  if (!subasta) return <Typography variant="h5">Subasta no encontrada</Typography>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3">{subasta.nombre}</Typography>
      <CardMedia component="img" height="300" image={subasta.imagen} alt={subasta.nombre} sx={{ my: 2 }} />
      <Typography variant="body1">{subasta.descripcion}</Typography>
      <Typography variant="h5" sx={{ mt: 2 }}>Precio actual: ${subasta.precio}</Typography>
      <Button variant="contained" sx={{ mt: 2 }}>Pujar</Button>
    </Box>
  );
}

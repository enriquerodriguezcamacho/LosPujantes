"use client";
import { Box, Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const subastas = [
  { id: "rolex", nombre: "Reloj Rolex Submariner", precio: 15000, imagen: "/img/rolex.jpg" },
  { id: "chaqueta", nombre: "Chaqueta Polo Ralph Lauren", precio: 300, imagen: "/img/chaqueta.jpg" },
  { id: "iphone", nombre: "iPhone 16", precio: 1200, imagen: "/img/iphone.jpg" },
];

export default function SubastasPage() {
  const router = useRouter();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3">Subastas Disponibles</Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {subastas.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card>
              <CardMedia component="img" height="200" image={item.imagen} alt={item.nombre} />
              <CardContent>
                <Typography variant="h6">{item.nombre}</Typography>
                <Typography variant="body2">Precio actual: ${item.precio}</Typography>
                <Button variant="contained" fullWidth sx={{ mt: 1 }} onClick={() => router.push(`/subastas/${item.id}`)}>
                  Ver Detalles
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

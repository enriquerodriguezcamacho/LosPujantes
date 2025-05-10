import { Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function SubastaItem({ subasta }) {
  const router = useRouter();

  return (
    <Card sx={{ cursor: "pointer" }} onClick={() => router.push(`/subastas/${subasta.id}`)}>
      <CardContent>
        <Typography variant="h6">{subasta.nombre}</Typography>
        <Typography variant="body2">Precio: ${subasta.precio}</Typography>
      </CardContent>
    </Card>
  );
}

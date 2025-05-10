import "./global.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Página de Subastas",
  description: "Aplicación de subastas con Next.js y Material UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider theme={theme}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

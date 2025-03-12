export default function Footer() {
    return (
      <footer style={footerStyle}>
        © 2025 Subastas Online. Todos los derechos reservados.
      </footer>
    );
  }
  
  const footerStyle = {
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#007bff",
    color: "white",
    textAlign: "center",
    padding: "10px",
  };
  
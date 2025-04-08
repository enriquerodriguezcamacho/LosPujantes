export const doLogin = async (username, password) => {
    try {
      const response = await fetch("https://das-p2-backend.onrender.com/api/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      // Si la respuesta no es OK, devolvemos el error recibido (por ejemplo, {"detail": "Invalid credentials"})
      if (!response.ok) {
        return { error: data.detail || "Error al iniciar sesión" };
      }
  
      return data;
    } catch (error) {
      return { error: "No se pudo conectar con el servidor." };
    }
  };
  
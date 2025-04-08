export const registerUser = async (userData) => {
    const formattedDate = userData.birth_date.split("/").reverse().join("-");
  
    try {
      const response = await fetch("https://das-p2-backend.onrender.com/api/users/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
          birth_date: formattedDate,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return { error: data.detail || "Error en el registro. Verifica los datos." };
      }
  
      return data;
    } catch (error) {
      return { error: "Error de conexión con el servidor." };
    }
  };
  
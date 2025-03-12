import axios from "axios";

const API_URL = "https://das-p2-backend.onrender.com/api/users";

export const registerUser = async (userData) => {
  try {
    console.log("Enviando datos de registro:", userData); // Para depuración

    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Registro exitoso:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error en el registro:");

    if (error.response) {
      console.error("Código de estado:", error.response.status);
      console.error("Mensaje del backend:", error.response.data);
    } else {
      console.error("Error sin respuesta del backend:", error.message);
    }

    return null;
  }
};

export async function getUserProfile() {
    const token = localStorage.getItem("accessToken");
    
    if (!token) {
        console.error("No hay token disponible");
        return null;
    }

    try {
        const response = await fetch("https://das-p2-backend.onrender.com/api/users/profile/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Error obteniendo el perfil");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en getUserProfile:", error);
        return null;
    }
}


import axios from "axios";

const API_URL = "https://das-p2-backend.onrender.com/api/users";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error.response?.data || error.message);
    return null;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login/`, { username, password }, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en login:", error.response?.data || error.message);
    return { error: "Credenciales incorrectas" };
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("Token no encontrado");
    return null;
  }

  try {
    const response = await axios.get(`${API_URL}/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener perfil:", error.response?.data || error.message);
    return null;
  }
};

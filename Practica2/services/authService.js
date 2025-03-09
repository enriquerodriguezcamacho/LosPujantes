import axios from "axios";

const API_URL = "https://das-p2-backend.onrender.com/api/users/";

export async function loginUser(email, password) {
  try {
    const response = await axios.post(`${API_URL}login`, { username: email, password });
    localStorage.setItem("token", response.data.access);
    return true;
  } catch (error) {
    console.error("Error en login:", error);
    return false;
  }
}

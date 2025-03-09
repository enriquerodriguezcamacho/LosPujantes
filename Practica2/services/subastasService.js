import axios from "axios";

const API_URL = "https://das-p2-backend.onrender.com/api/subastas/";

export const getSubastas = async (filtro = "") => {
  const response = await axios.get(`${API_URL}?search=${filtro}`);
  return response.data;
};

export const getSubastaById = async (id) => {
  const response = await axios.get(`${API_URL}${id}`);
  return response.data;
};

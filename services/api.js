// services/api.js
export const getAccessToken = () => localStorage.getItem("access_token");

export const apiFetch = async (url, options = {}) => {
  const token = getAccessToken();
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(`Error en la petición a ${url}`);
  }
  return await response.json();
};

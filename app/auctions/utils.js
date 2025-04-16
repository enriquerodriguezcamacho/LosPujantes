// app/auctions/utils.js

// app/auctions/utils.js

export const getAuctions = async () => {
  try {
    let allAuctions = [];
    let nextUrl = "http://127.0.0.1:8000/api/auctions/";

    while (nextUrl) {
      const response = await fetch(nextUrl);
      const data = await response.json();
      allAuctions = [...allAuctions, ...(data.results || [])];
      nextUrl = data.next;
    }

    return allAuctions;
  } catch (error) {
    console.error("Error al obtener subastas:", error);
    return [];
  }
};


export const getCategories = async () => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/auctions/categories/");
    const data = await response.json();

    if (data.results && Array.isArray(data.results)) {
      return data.results;
    }

    if (Array.isArray(data)) {
      return data;
    }

    throw new Error("Categorías no tienen el formato esperado");
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return [];
  }
};


export const getAuctionById = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${id}/`);
    if (!response.ok) throw new Error("No se pudo cargar la subasta");
    return await response.json();
  } catch (error) {
    console.error("Error al obtener subasta:", error);
    return null;
  }
};

export const getBidsByAuctionId = async (auctionId) => {
  try {
    const token = localStorage.getItem("access");

    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/bid/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("No se pudieron cargar las pujas");

    const data = await response.json();

    return Array.isArray(data) ? data : (data.results || []);
  } catch (error) {
    console.error("Error al obtener pujas:", error);
    return [];
  }
};


export const createBid = async (auctionId, price, token) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/auctions/${auctionId}/bid/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ price }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.detail || "Error al crear la puja");
    }

    return await response.json();
  } catch (error) {
    console.error("Error al crear puja:", error);
    throw error;
  }
};

export const getAuctions = async () => {
    const response = await fetch("https://das-p2-backend.onrender.com/api/auctions/");
    const data = await response.json();
  
    return data.results || [];
  };
  
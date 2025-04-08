const subastas = [
  {
    id: 1,
    nombre: "Rolex Submariner",
    descripcion: "Reloj de lujo con caja de acero inoxidable y movimiento automático.",
    precio: "15,000€",
    imagen: "/img/rolex.jpg",
  },
  {
    id: 2,
    nombre: "Chaqueta Polo Ralph Lauren",
    descripcion: "Chaqueta de cuero genuino con diseño clásico.",
    precio: "350€",
    imagen: "/img/chaqueta.jpg",
  },
  {
    id: 3,
    nombre: "iPhone 16",
    descripcion: "Último modelo de Apple con tecnología avanzada.",
    precio: "1,500€",
    imagen: "/img/iphone.jpg",
  },
];

export const getSubastas = async () => {
  // Aquí puedes cambiar a fetch real si conectas con backend
  return new Promise((resolve) => {
    setTimeout(() => resolve(subastas), 1000);
  });
};

export const getSubastaById = async (id) => {
  const all = await getSubastas();
  return all.find((item) => item.id === Number(id));
};

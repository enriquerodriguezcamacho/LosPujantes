document.addEventListener("DOMContentLoaded", () => {
    const searchBar = document.getElementById("searchBar");
    const subastasContainer = document.getElementById("subastas-container");

    const subastas = [
        {
            nombre: "Chaqueta Polo Ralph Lauren",
            imagen: "img/chaqueta.jpg",
            descripcion: "Chaqueta elegante y cómoda en color beige.",
            precio: 120,
            edad: "2 años",
            estado: "Muy bueno",
            material: "Algodón y poliéster",
            color: "Beige"
        },
        {
            nombre: "iPhone 15",
            imagen: "img/iphone.jpg",
            descripcion: "El último smartphone de Apple con tecnología avanzada.",
            precio: 999,
            edad: "1 año",
            estado: "Como nuevo",
            material: "Vidrio y aluminio",
            color: "Negro"
        },
        {
            nombre: "Reloj Rolex Submariner",
            imagen: "img/rolex.jpg",
            descripcion: "Reloj de lujo resistente al agua.",
            precio: 8500,
            edad: "5 años",
            estado: "Excelente",
            material: "Acero inoxidable y oro",
            color: "Negro y dorado"
        }
    ];

    function mostrarSubastas(subastas) {
        subastasContainer.innerHTML = "";
        subastas.forEach(subasta => {
            const item = document.createElement("div");
            item.classList.add("subasta-item");
            item.innerHTML = `
                <img src="${subasta.imagen}" alt="${subasta.nombre}">
                <p><strong>${subasta.nombre}</strong></p>
                <p>${subasta.descripcion}</p>
                <p><strong>Precio:</strong> $${subasta.precio}</p>
            `;
            item.addEventListener("click", () => {
                window.location.href = `detalle.html?nombre=${encodeURIComponent(subasta.nombre)}`;
            });
            subastasContainer.appendChild(item);
        });
    }

    function buscarSubasta() {
        const query = searchBar.value.toLowerCase();
        const resultados = subastas.filter(subasta =>
            subasta.nombre.toLowerCase().includes(query)
        );
        mostrarSubastas(resultados);
    }

    searchBar.addEventListener("input", buscarSubasta);
    mostrarSubastas(subastas); // Mostrar todas las subastas al cargar la página
});
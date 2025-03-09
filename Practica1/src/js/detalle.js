document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const nombreSubasta = urlParams.get("nombre");

    const subastas = {
        "Chaqueta Polo Ralph Lauren": {
            imagen: "img/chaqueta.jpg",
            descripcion: "Chaqueta elegante y cómoda en color beige.",
            precio: 120,
            edad: "2 años",
            estado: "Muy bueno",
            material: "Algodón y poliéster",
            color: "Beige"
        },
        "iPhone 15": {
            imagen: "img/iphone.jpg",
            descripcion: "El último smartphone de Apple con tecnología avanzada.",
            precio: 999,
            edad: "1 año",
            estado: "Como nuevo",
            material: "Vidrio y aluminio",
            color: "Negro"
        },
        "Reloj Rolex Submariner": {
            imagen: "img/rolex.jpg",
            descripcion: "Reloj de lujo resistente al agua.",
            precio: 8500,
            edad: "5 años",
            estado: "Excelente",
            material: "Acero inoxidable y oro",
            color: "Negro y dorado"
        }
    };

    if (nombreSubasta && subastas[nombreSubasta]) {
        const subasta = subastas[nombreSubasta];
        document.getElementById("auction-image").src = subasta.imagen;
        document.getElementById("auction-title").textContent = nombreSubasta;
        document.getElementById("auction-description").textContent = subasta.descripcion;
        document.getElementById("auction-price").textContent = `$${subasta.precio}`;
        document.getElementById("auction-age").textContent = subasta.edad;
        document.getElementById("auction-condition").textContent = subasta.estado;
        document.getElementById("auction-material").textContent = subasta.material;
        document.getElementById("auction-color").textContent = subasta.color;
    }

    document.querySelector(".bid-button").addEventListener("click", () => {
        const puja = parseFloat(document.querySelector(".bid-input").value);
        const precioActual = parseFloat(document.getElementById("auction-price").textContent.replace("$", ""));
        if (puja > precioActual) {
            alert(`Puja de $${puja} realizada con éxito.`);
        } else {
            alert("La puja debe ser mayor al precio actual.");
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").addEventListener("click", registrarUsuario);
});

function cargarCiudades() {
    const comunidad = document.getElementById("comunidad").value;
    const ciudadSelect = document.getElementById("ciudad");

    // Limpiar el desplegable de ciudades
    ciudadSelect.innerHTML = '<option value="">Selecciona una ciudad</option>';

    if (comunidad) {
        ciudadSelect.disabled = false;

        // Simulación de ciudades por comunidad
        const ciudades = {
            andalucia: ["Sevilla", "Málaga", "Granada", "Córdoba"],
            madrid: ["Madrid", "Alcalá de Henares", "Getafe"],
            catalunya: ["Barcelona", "Girona", "Lleida", "Tarragona"],
            valencia: ["Valencia", "Alicante", "Castellón"]
        };

        ciudades[comunidad].forEach(ciudad => {
            const option = document.createElement("option");
            option.value = ciudad;
            option.textContent = ciudad;
            ciudadSelect.appendChild(option);
        });
    } else {
        ciudadSelect.disabled = true;
    }
}

function registrarUsuario() {
    const comunidad = document.getElementById("comunidad").value;
    const ciudad = document.getElementById("ciudad").value;

    if (!comunidad || !ciudad) {
        alert("Por favor, selecciona una comunidad y una ciudad.");
        return;
    }

    // Resto de la lógica de registro...
    alert("Registro exitoso.");
}
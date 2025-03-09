document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").addEventListener("click", iniciarSesion);
});

function iniciarSesion() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    
    if (!email || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }
    
    if (!validarEmail(email)) {
        alert("Por favor, introduce un correo válido.");
        return;
    }
    
    // Simulación de usuarios mockeados
    const usuarios = [
        { email: "usuario1@example.com", password: "123456" },
        { email: "usuario2@example.com", password: "password" }
    ];
    
    const usuarioValido = usuarios.find(user => user.email === email && user.password === password);
    
    if (usuarioValido) {
        alert("Inicio de sesión exitoso.");
        window.location.href = "index.html";
    } else {
        alert("Correo o contraseña incorrectos.");
    }
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
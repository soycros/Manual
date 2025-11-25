const SALT = "b72c3f0c19c2a1234eb1a80cf7f2d1d3";  // La SALT es fija, como la definimos
const ADMIN_PASSWORD_HASH = "7b9d52e3bbf759c3f1a1b8ecda3bbd7f3c1a2638c4a2f0e00b514bc7a1c40e0c";  // Hash que se debe comparar

// Función para hacer SHA-256
async function sha256(message) {
    const data = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Función que hace 2000 iteraciones del hash
async function hashPassword(password) {
    let value = password + SALT;
    console.log("Original password + salt:", password + SALT);  // Log del texto antes de hacer el hash
    for (let i = 0; i < 2000; i++) {
        value = await sha256(value);
    }
    return value;
}

// Función de login para Admin
async function adminLogin() {
    const pass = prompt("Ingrese la contraseña de administrador:");
    if (!pass) return;

    console.log("Contraseña ingresada:", pass);  // Verifica lo que el usuario está ingresando
    
    const hashed = await hashPassword(pass);
    console.log("Hash generado:", hashed);  // Verifica el hash que estamos generando

    console.log("Hash almacenado:", ADMIN_PASSWORD_HASH);  // Verifica el hash que tienes en el archivo

    if (hashed === ADMIN_PASSWORD_HASH) {
        sessionStorage.setItem("admin", "true");
        window.location.href = "admin.html";
    } else {
        alert("Contraseña incorrecta");
    }
}

// Función para entrar como invitado
function goGuest() {
    window.location.href = "post.html?id=lista";
}

// Función para logout
function logout() {
    sessionStorage.removeItem("admin");
    window.location.href = "index.html";
}

const SALT = "b72c3f0c19c2a1234eb1a80cf7f2d1d3";  // La SALT predefinida
const ADMIN_PASSWORD_HASH = "7b9d52e3bbf759c3f1a1b8ecda3bbd7f3c1a2638c4a2f0e00b514bc7a1c40e0c";  // El hash final almacenado de la contraseña

// Función para hacer SHA-256
async function sha256(message) {
    const data = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Función que hace 100 iteraciones del hash (para pruebas rápidas)
async function hashPassword(password) {
    let value = password + SALT;
    console.log("Concatenado (Contraseña + Salt):", password + SALT);  // Log de la concatenación
    for (let i = 0; i < 100; i++) {  // Usamos 100 iteraciones para pruebas rápidas
        value = await sha256(value);
    }
    console.log("Hash final después de 100 iteraciones:", value);  // Verifica el hash final
    return value;
}

// Función de login para Admin
async function adminLogin() {
    const pass = prompt("Ingrese la contraseña de administrador:");
    if (!pass) return;

    console.log("Contraseña ingresada:", pass);  // Verifica lo que el usuario está ingresando
    
    setTimeout(async () => {  // Usamos setTimeout para no bloquear el hilo principal
        const hashed = await hashPassword(pass);
        console.log("Hash generado:", hashed);  // Verifica el hash que estamos generando

        console.log("Hash almacenado:", ADMIN_PASSWORD_HASH);  // Verifica el hash guardado

        if (hashed === ADMIN_PASSWORD_HASH) {
            sessionStorage.setItem("admin", "true");
            window.location.href = "admin.html";
        } else {
            alert("Contraseña incorrecta");
        }
    }, 0);  // De esta forma no bloqueamos la interfaz
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

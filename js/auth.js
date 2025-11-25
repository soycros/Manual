const SALT = "b72c3f0c19c2a1234eb1a80cf7f2d1d3";  // SALT predefinida
const ADMIN_PASSWORD_HASH = "5f6f011e0db3dd288d4797394cd3b50d704c00cd3fd27bccb8c4075980604664";  // El hash final almacenado de la contraseña

// Función para hacer SHA-256
async function sha256(message) {
    const data = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Función para hacer el hashing con 100 iteraciones (para pruebas rápidas)
async function hashPassword(password) {
    let value = password + SALT;  // Concatenar la contraseña con la SALT
    console.log("Concatenado (Contraseña + Salt):", value);  // Verifica lo que estamos concatenando
    
    for (let i = 0; i < 100; i++) {  // Realizamos 100 iteraciones para pruebas rápidas
        value = await sha256(value);
    }

    console.log("Hash final después de 100 iteraciones:", value);  // El hash después de 100 iteraciones
    return value;
}

// Función de login para Admin
async function adminLogin() {
    const pass = prompt("Ingrese la contraseña de administrador:");
    if (!pass) return;

    console.log("Contraseña ingresada:", pass);  // Verifica lo que el usuario está ingresando
    
    setTimeout(async () => {  // Usamos setTimeout para no bloquear el hilo principal
        const hashed = await hashPassword(pass);  // Generamos el hash de la contraseña ingresada
        console.log("Hash generado:", hashed);  // Verifica el hash generado

        console.log("Hash almacenado:", ADMIN_PASSWORD_HASH);  // Verifica el hash que guardamos en el código

        if (hashed === ADMIN_PASSWORD_HASH) {
            sessionStorage.setItem("admin", "true");  // Establecemos la sesión de admin
            window.location.href = "admin.html";  // Redirige al panel de administración
        } else {
            alert("Contraseña incorrecta");  // Si no coincide, muestra mensaje de error
        }
    }, 0);  // Esto asegura que no se bloquea la interfaz de usuario
}

// Función para acceder como invitado
function goGuest() {
    window.location.href = "post.html?id=lista";  // Redirige al listado de posts
}

// Función para cerrar sesión
function logout() {
    sessionStorage.removeItem("admin");  // Remueve el admin de la sesión
    window.location.href = "index.html";  // Redirige al inicio
}

const SALT = "b72c3f0c19c2a1234eb1a80cf7f2d1d3";
const ADMIN_PASSWORD_HASH = "7b9d52e3bbf759c3f1a1b8ecda3bbd7f3c1a2638c4a2f0e00b514bc7a1c40e0c";

async function sha256(message) {
    const data = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function hashPassword(password) {
    let value = password + SALT;
    for (let i = 0; i < 2000; i++) {
        value = await sha256(value);
    }
    return value;
}

async function adminLogin() {
    const pass = prompt("Ingrese la contraseña de administrador:");
    if (!pass) return;
    const hashed = await hashPassword(pass);
    if (hashed === ADMIN_PASSWORD_HASH) {
        sessionStorage.setItem("admin", "true");
        window.location.href = "admin.html";
    } else {
        alert("Contraseña incorrecta");
    }
}

function goGuest() {
    window.location.href = "post.html?id=lista";
}

function logout() {
    sessionStorage.removeItem("admin");
    window.location.href = "index.html";
}

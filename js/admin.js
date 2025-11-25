async function crearPost() {
    const titulo = document.getElementById("titulo").value;
    const contenido = document.getElementById("contenido").value;

    if (!titulo || !contenido) {
        alert("Completa los campos");
        return;
    }

    let posts = await obtenerPosts();

    posts.push({
        id: Date.now(),
        titulo,
        contenido,
        fecha: new Date().toISOString().split("T")[0]
    });

    localStorage.setItem("posts_local", JSON.stringify(posts));

    alert("Post guardado (local).");
    location.reload();
}

async function cargarAdminPosts() {
    let posts = await obtenerPosts();
    let html = "";

    posts.forEach(p => {
        html += `
        <div class="post-item">
            <b>${p.titulo}</b>
            <button onclick="eliminar(${p.id})">Eliminar</button>
        </div>`;
    });

    document.getElementById("listaPosts").innerHTML = html;
}

function eliminar(id) {
    let posts = JSON.parse(localStorage.getItem("posts_local"));
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem("posts_local", JSON.stringify(posts));
    alert("Eliminado");
    location.reload();
}

window.onload = cargarAdminPosts;

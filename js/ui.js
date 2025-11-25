(async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const cont = document.getElementById("postContainer");
    const posts = await obtenerPosts();

    if (id === "lista") {
        let html = "<h2>Listado de Problemas</h2>";
        posts.forEach(p => {
            html += `
                <div class="post-item">
                    <a href="post.html?id=${p.id}">${p.titulo}</a>
                    <span>${p.fecha}</span>
                </div>`;
        });

        cont.innerHTML = html;
    } else {
        const post = posts.find(p => p.id == id);

        cont.innerHTML = `
            <h1>${post.titulo}</h1>
            <p>${post.contenido}</p>
            <small>Fecha: ${post.fecha}</small>
            <br><br>
            <a href="post.html?id=lista">← Volver al listado</a>
        `;
    }
})();

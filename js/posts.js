async function obtenerPosts() {
    let resp = await fetch("data/posts.json");
    let posts = await resp.json();

    const local = JSON.parse(localStorage.getItem("posts_local"));
    if (local) posts = local;

    return posts;
}

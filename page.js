window.onload = () => {
    let uri = location.hash.replace("#", "");
    if(document.querySelectorAll("nav a").length < 2) {
        document.querySelector("nav").classList.add("hidden");
    }
    if (uri == "") {
        uri = document.querySelector("nav a").getAttribute("href").replace("#", "");
        location.hash = uri;
    } else {
        loadPage(uri);
    }
    document.addEventListener("click", (e) => {
        if(e.target.className.indexOf("clickable") >= 0) {
            if(e.target.className.indexOf("active") >= 0) {
                e.target.classList.remove("active");
            } else {
                document.querySelectorAll(".clickable.active").forEach(e => {
                    e.classList.remove("active");
                })
                e.target.classList.add("active");
            }
        } else {
            document.querySelectorAll(".clickable.active").forEach(e => {
                e.classList.remove("active");
            })
        }
    });
}

let loadPage = (uri) => {
    fetch("./pages/" + uri + "?" + new Date().getTime()).then((res) => {
        res.text().then((data) => {
            document.getElementById("content").innerHTML = data;
        });
    });
    document.querySelectorAll("nav a").forEach(f=>{f.classList.remove("active")});
    document.querySelector("a[href='#"+uri+"']").classList.add("active");
}
window.addEventListener('hashchange', () => {
    let uri = location.hash.replace("#", "");
    loadPage(uri);
});
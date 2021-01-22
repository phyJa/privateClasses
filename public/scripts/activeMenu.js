const url = window.location.pathname;
const links = window.document.querySelectorAll("header a");

for(let link of links) {
    if(url.includes(link.getAttribute("href"))) {
        link.classList.add("active");
    }
}
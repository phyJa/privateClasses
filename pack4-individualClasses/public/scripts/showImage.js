// Get the elements
const imageContainer = document.querySelector(".card .imageContainer");
const input = document.querySelector(".card .dataContainer form .avatar_url .data input");
const avatarUrl = document.getElementById("avatar_url");

// Display the old image
imageContainer.style.background = `
    url(${avatarUrl.getAttribute("value")}) no-repeat center center / cover
`;

// Display the new image
input.addEventListener("input",
    function(event) {
        imageContainer.style.background = `
            url(${event.target.value}) no-repeat center center / cover
        `;
    }
);
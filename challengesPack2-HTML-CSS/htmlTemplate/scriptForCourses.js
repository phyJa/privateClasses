// Capture the modalOverlay in a variable
const modalOverlay = document.querySelector(".modalOverlay");

// Add the close modal element in variable
const closingModal = modalOverlay.querySelector("#closeModal");



// Add an event listener to it
closingModal.addEventListener("click", 
    () => {
        modalOverlay.classList.add("notDisplay");
    }
)
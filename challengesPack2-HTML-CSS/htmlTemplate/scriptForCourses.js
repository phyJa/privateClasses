// Capture the modalOverlay in a variable
const modalOverlay = document.querySelector(".modalOverlay");

// Add the close modal element in variable
const closingModal = modalOverlay.querySelector("#closeModal");

// Add the cards in a variable
const courses = document.querySelectorAll(".course");

// For each one of the courses, add an event listener which removes the notDisplay class to the modalOverlay
for(let course of courses) {
    course.addEventListener("click",
        () => {
            modalOverlay.classList.remove("notDisplay")
        }    
    )
}


// Add an event listener to it to add the modal overlay
closingModal.addEventListener("click", 
    () => {
        modalOverlay.classList.add("notDisplay");
    }
)
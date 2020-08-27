// Capture the modalOverlay in a variable
const modalOverlay = document.querySelector(".modalOverlay");

// Select the modal
const modal = modalOverlay.querySelector(".modal");

// Add the close modal element in variable
const closingModal = modalOverlay.querySelector("#closeModal");

// Add the maximizeModal icon into a variable
const maximizeModal = modalOverlay.querySelector("#maximizeModal");

// Add the disMaximizeModal icon into a variable
const disMaximizeModal = modalOverlay.querySelector("#disMaximizeModal");

// Get the iframe too
const iframe = modalOverlay.querySelector("iframe");

// Add the cards in a variable
const courses = document.querySelectorAll(".course");

// For each one of the courses, add an event listener which removes the notDisplay class to the modalOverlay
for(let course of courses) {
    course.addEventListener("click",
        () => {
            // Remove the class notDisplay
            modalOverlay.classList.remove("notDisplay");

            // Add the source attribute
            iframe.setAttribute("src", `https://rocketseat.com.br/${course.id}`);
        }    
    )
}


// Add an event listener to it to add the modal overlay
closingModal.addEventListener("click", 
    () => {
        modalOverlay.classList.add("notDisplay");

        // Add the source attribute as empty
        iframe.setAttribute("src", "");

        //Remove the maxmimized class
        modal.classList.remove("maximize");

        // Take the maximizeModal element and display it again
        maximizeModal.style.display = "inline";

        // Take the disMaximizeModal element and remove it from display
        disMaximizeModal.style.display = "none";
    }
)

// Add an event listener to maximizeModal
maximizeModal.addEventListener("click",
    () => {
        if(!modal.classList.contains("maximize")) {
            // Add the class to maximize the modal
            modal.classList.add("maximize");

            // Insert the display class in the disMaximize icon
            disMaximizeModal.style.display = "inline";

            // Take the maximizeModal element and remove it from the display
            maximizeModal.style.display = "none";
        }

        disMaximizeModal.addEventListener("click",
            () => {
                // Remove the maximize class
                modal.classList.remove("maximize");

                // Insert the display class in the disMaximize icon
                disMaximizeModal.style.display = "none";

                // Take the maximizeModal element and display it again
                maximizeModal.style.display = "inline";
            }
        )
            
    }
)
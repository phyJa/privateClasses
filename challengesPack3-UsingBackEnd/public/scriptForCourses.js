// Add the cards in a variable
const courses = document.querySelectorAll(".course");

// For each one of the courses, add an event listener which removes the notDisplay class to the modalOverlay
for(let course of courses) {
    course.addEventListener("click",
        () => {
            // Get the course id
            const courseId = course.id;

            // Pass it to the browser
            window.location.href = courseId;
        }    
    )
}
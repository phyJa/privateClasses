const deleteButton = document.querySelector("#deleteButton");

deleteButton.addEventListener(
    "click",
    function(event) {
        const confirmation = confirm("Do you really want to delete this profile?");
        if(!confirmation) {
            event.preventDefault();
        }
    }
);
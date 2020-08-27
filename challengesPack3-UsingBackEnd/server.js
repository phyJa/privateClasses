// Call express through node.js
const express = require("express");

// Call nunjucks
const nunjucks = require("nunjucks");

// Create the server
const server = express();

// Server configuration
server.set("view engine", "html");

// Serve the view files with the ones in the public folder
server.use(express.static("public"));

// Nunjucks configuration
nunjucks.configure(
    "views",
    {
        express: server
    }
);


// Adding a route
server.get(
    "/",
    (req, res) => {
        return res.render("headerTemplate");
    }
);

// Courses page
server.get(
    "/courses",
    (req, res) => {
        return res.render("courses");
    }
);

// About page
server.get(
    "/about",
    function(req, res) {
        return res.render("about");
    }
);


// Test the server
server.listen(
    4000,
    () => {
        console.log("Server is running!");
    }
);
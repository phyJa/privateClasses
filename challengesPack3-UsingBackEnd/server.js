// Call express through node.js
const express = require("express");

// Call nunjucks
const nunjucks = require("nunjucks");

// Create the server
const server = express();

// Server configuration
server.set("view engine", "html");

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


// Test the server
server.listen(
    4000,
    () => {
        console.log("Server is running!");
    }
);
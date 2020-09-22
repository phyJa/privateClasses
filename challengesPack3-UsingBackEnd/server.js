// Call express through node.js
const express = require("express");

// Call nunjucks
const nunjucks = require("nunjucks");

// Call the data
const coursesInformation = require("./data/coursesData");

// Create the server
const server = express();

// Server configuration
server.set("view engine", "njk");

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
        return res.render(
            "courses",
            {
                data: coursesInformation
            }
        );
    }
);

// About page
server.get(
    "/about",
    function(req, res) {
        return res.render("about");
    }
);

// Video page
server.get(
    "/description/:id",
    (req, res) => {
        const reqId = req.params.id;

        res.send(`reqId is ${reqId}`);
    }
);

// Not-found page
server.use(
    function(req, res) {
        res.status(404).render("notFound");
    }
);


// Test the server
server.listen(
    4000,
    () => {
        console.log("Server is running!");
    }
);
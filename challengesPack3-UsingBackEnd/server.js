// Call express through node.js
const express = require("express");

// Create the server
const server = express();

// Adding a route
server.get(
    "/",
    (req, res) => {
        return res.send("Hello!!");
    }
);


// Test the server
server.listen(
    4000,
    () => {
        console.log("Server is running!");
    }
);
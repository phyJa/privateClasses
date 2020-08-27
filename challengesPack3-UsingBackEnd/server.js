// Call express through node.js
const express = require("express");

// Create the server
const server = express();

// Test the server
server.listen(
    5000,
    () => {
        console.log("Server is running!");
    }
)
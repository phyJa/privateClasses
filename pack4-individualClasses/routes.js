// Call express and initiate the router
const express = require("express");
const routes = express.Router();
// Functions to render pages
const renderPages = require("./functions/renderPages");
// Routes
routes.get("/", renderPages.renderLanding);
routes.get("/teachers/create", renderPages.renderCreate);
routes.post("/teachers/create", 
    function(request, response) {
        return response.send(request.body);
    }
);
// Export
module.exports = routes;
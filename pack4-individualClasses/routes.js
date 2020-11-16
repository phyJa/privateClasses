// Call express and initiate the router
const express = require("express");
const routes = express.Router();
// Functions to render pages
const renderPages = require("./functions/renderPages");
// Routes
routes.get("/", renderPages.renderLanding);
routes.get("/teachers/create", renderPages.renderCreate);
// Export
module.exports = routes;
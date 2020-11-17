// Call express and initiate the router
const express = require("express");
const routes = express.Router();
// Functions to render pages
const renderPages = require("./functions/renderPages");
// Functions to validate and write data
const validateAndWrite = require("./teachers");
// Routes
routes.get("/", renderPages.renderLanding);
routes.get("/teachers/create", renderPages.renderCreate);
routes.post("/teachers/create", validateAndWrite.validateAndWriteData);
// Export
module.exports = routes;
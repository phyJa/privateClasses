// Call express and initiate the router
const express = require("express");
const routes = express.Router();
// Functions to render pages
const mainFunctions = require("./functions/mainFunctions");
// Routes
routes.get("/", mainFunctions.renderLanding);
routes.get("/teachers/create", mainFunctions.renderCreate);
routes.get("/teachers/:id/show", mainFunctions.showTeacher);
routes.post("/teachers/create", mainFunctions.validateAndWriteData);
// Export
module.exports = routes;
// Call express and initiate the router
const express = require("express");
const routes = express.Router();
// Functions
const { 
    renderLanding,
    renderCreate,
    renderEdit,
    showTeacher,
    validateAndWriteData
} = require("../functions/mainFunctions");
// Routes
routes.get("/", renderLanding);
routes.get("/teachers/create", renderCreate);
routes.get("/teachers/:id/show", showTeacher);
routes.get("/teachers/:id/edit", renderEdit);
routes.post("/teachers/create", validateAndWriteData);
// Export
module.exports = routes;
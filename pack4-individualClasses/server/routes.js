// Call express and initiate the router
const express = require("express");
const routes = express.Router();
// Functions
const {
    editTeacher, 
    renderLanding,
    renderCreate,
    renderEdit,
    showTeacher,
    validateAndWriteData
} = require("../functions/mainFunctions");
// Routes
// Render and show (GET)
routes.get("/", renderLanding);
routes.get("/teachers/create", renderCreate);
routes.get("/teachers/:id/show", showTeacher);
routes.get("/teachers/:id/edit", renderEdit);
// Create (POST)
routes.post("/teachers/create", validateAndWriteData);
// Modify (PUT)
routes.put("/teachers/edit", editTeacher);
// Export
module.exports = routes;
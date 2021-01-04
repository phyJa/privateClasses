// Call express and initiate the router
const express = require("express");
const routes = express.Router();
// Functions
const {
    editTeacher, 
    renderLanding,
    renderCreate,
    renderEdit,
    deleteTeacher,
    showTeacher,
    validateAndWriteData
} = require("./controllers/teachers");
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
//Delete (DELETE)
routes.delete("/teachers/edit", deleteTeacher);
// Export
module.exports = routes;
// Call express and initiate the router
const express = require("express");
const routes = express.Router();
// Functions
const {
    editTeacher, 
    renderTeacherLanding,
    renderTeacherCreate,
    renderTeacherEdit,
    deleteTeacher,
    showTeacher,
    validateAndWriteTeacherData
} = require("./controllers/teachers");
// Routes
// Render and show (GET)
routes.get("/", renderTeacherLanding);
routes.get("/teachers/create", renderTeacherCreate);
routes.get("/teachers/:id/show", showTeacher);
routes.get("/teachers/:id/edit", renderTeacherEdit);
// Create (POST)
routes.post("/teachers/create", validateAndWriteTeacherData);
// Modify (PUT)
routes.put("/teachers/edit", editTeacher);
//Delete (DELETE)
routes.delete("/teachers/edit", deleteTeacher);
// Export
module.exports = routes;
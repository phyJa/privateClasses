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
const {
    editStudent, 
    renderStudentLanding,
    renderStudentCreate,
    renderStudentEdit,
    deleteStudent,
    showStudent,
    validateAndWriteStudentData
} = require("./controllers/students");
// Routes
// Teachers
// Render and show (GET)
routes.get("/", function (request, response) {return response.redirect("/teachers")} );
routes.get("/teachers", renderTeacherLanding);
routes.get("/teachers/create", renderTeacherCreate);
routes.get("/teachers/:id/show", showTeacher);
routes.get("/teachers/:id/edit", renderTeacherEdit);
// Create (POST)
routes.post("/teachers/create", validateAndWriteTeacherData);
// Modify (PUT)
routes.put("/teachers/edit", editTeacher);
//Delete (DELETE)
routes.delete("/teachers/edit", deleteTeacher);
// Students
// Render and show (GET)
routes.get("/students", renderStudentLanding);
routes.get("/students/create", renderStudentCreate);
routes.get("/students/:id/show", showStudent);
routes.get("/students/:id/edit", renderStudentEdit);
// Create (POST)
routes.post("/students/create", validateAndWriteStudentData);
// Modify (PUT)
routes.put("/students/edit", editStudent);
//Delete (DELETE)
routes.delete("/students/edit", deleteStudent);
// Export
module.exports = routes;
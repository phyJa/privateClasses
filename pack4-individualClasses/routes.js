const express = require("express");
const routes = express.Router();
// Functions to render pages
const renderPages = require("./functions/renderPages");

routes.get("/", renderPages.renderLanding);
routes.get("/teachers/create", renderPages.renderCreate);

module.exports = routes;
const express = require("express");

const routes = express.Router();

routes.get(

    "/",

    (request, response) => { return response.render("landing"); }

);

module.exports = routes;
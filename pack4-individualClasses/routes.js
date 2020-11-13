const express = require("express");

const routes = express.Router();

routes.get(
    "/",
    function (request, response) {
        return response.render("landing"); 
    }
);
routes.get(
    "/teachers/create", 
    function (request, response) {
        return response.render("teachers/create");
    }
);

module.exports = routes;
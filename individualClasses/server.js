const express = require("express");

const nunjucks = require("nunjucks");

const server = express();

// Settings

server.set("view engine", "njk");

server.use(express.static("public"));

nunjucks.configure(

    "pages",

    {
        
        express: server,

        autoescape: false, // This is for nunjucks to recognize internal html tags in variables

        noCache: true // Not use cache (a version which is saved in the computer).

    }

);

server.get(
    
    "/",

    (request, response) => { return response.render("landing"); }

);

server.listen(3000, () => { console.log("Listening!" ); } );
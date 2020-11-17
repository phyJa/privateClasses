const express = require("express");

const nunjucks = require("nunjucks");

const server = express();

const routes = require("./routes");

// Settings
server.set("view engine", "njk");
server.use(express.static("public"));
// Enable POST visualization
server.use(express.urlencoded({extended: true}));
nunjucks.configure(
    "pages",
    {
        express: server,
        autoescape: false, // This is for nunjucks to recognize internal html tags in variables
        noCache: true // Not use cache (a version which is saved in the computer).
    }
);
server.use(routes);
// Listen
server.listen(4000, () => { console.log("Listening!" ); } );
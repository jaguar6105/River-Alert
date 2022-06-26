// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
//const sql = require("mysql");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8050;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());


// Requiring our models for syncing
var db = require("./models");

const river = ["test"];
const ids = [];



// This is the home page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

//serve the file rivers.html
app.get("/river/:id", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/river.html"));
});

//serve the file login.html
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/login.html"));
});

//returns the array data as a json file
app.get("/db/river/:id", function (req, res) {
    db.station.findAll({
        where: {
            river_name: req.params.river_name,
        }
        }).then(function (response) {
        res.json(response);
    });
    return res.json(river);
});

//This is for loading rivers
app.get("/db/river", function (req, res) {
 //   console.log("Test");
    db.station.findAll({
        }).then(function (response) {
        res.json(response);
    });

});

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT http://localhost:" + PORT);
    });
});

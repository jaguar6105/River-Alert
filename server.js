// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8050;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

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

//returns the array data as a json file
app.get("/api/river/:id", function (req, res) {
    return res.json(river);
});


app.listen(PORT, function () {
    console.log("App listening on PORT http://localhost:" + PORT);
});


// Dependencies
// =============================================================
const { response } = require("express");
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

//serve the file login.html
app.get("/newUser", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/createUser.html"));
});

//checks for login information
app.get("/login/:username/:password", function (req, res) {

    db.userAccount.findAll({
        where: {
            username: req.params.username
        }
    }).then(function (response) {
        let result = "failure";
        if(response[0]) {
        if(response[0].userpassword == req.params.password){
            result = "success";
        }
    }
        res.json(result);
    });
});





//This is for getting follows
app.get("/db/follow/:username", function (req, res) {
    //   console.log("Test");
       db.follow.findAll({
        where: {
            username: req.params.username
        }
           }).then(function (response) {
           res.json(response);
       });
   
   });

   //delete follow from db
   app.delete("/db/follow/:username/:river", function (req, res) {
    db.follow.destroy({
        where: {
            username: req.params.username,
            riverId: req.params.river
        }
    }).then(function (response) {
        res.json(response);
    });
});

// Add a follow to db
app.post("/db/follow", function (req, res) {
    db.follow.create(req.body).then(function (response) {
        res.json(response);
    });
});

   

db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT http://localhost:" + PORT);
    });
});

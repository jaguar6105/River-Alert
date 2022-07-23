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

//serve the file login.html
app.get("/createAlert/:id", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/createAlert.html"));
});


//serve the file rivers.html
app.get("/auth/:id", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/auth.html"));
});


//checks for login information
app.get("/login/:username/:password", function (req, res) {

    db.userAccount.findAll({
        where: {
            username: req.params.username
        }
    }).then(function (response) {
        let result = "failure";
        if (response[0]) {
            if (response[0].userpassword == req.params.password) {
                if (response[0].accountStatus == "Active") {
                    result = "success";
                }
            }
        }
        res.json(result);
    });
});

//checks for login information
app.get("/user/:username", function (req, res) {

    db.userAccount.findAll({
        where: {
            username: req.params.username
        }
    }).then(function (response) {
        let result = "failure";
        if (response.length == 0) {
            result = "pass";
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

// Add a user to db
app.post("/db/user", function (req, res) {
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
        token += characters[Math.floor(Math.random() * characters.length)];
    }

    let user = {
        username: req.body.username,
        userpassword: req.body.userpassword,
        accountStatus: "Pending",
        confirmationCode: token,
        email: req.body.email
    }
    db.userAccount.create(user).then(function (response) {
        res.json(response);
    });
});

// authorize user route
app.post("/db/:code", function (req, res) {
    db.userAccount.update({
        accountStatus: "Active"},
        {where: {
            confirmationCode: req.params.code
        }
    }).then(function (response) {
        console.log(response);
        res.json(response[0]);
    });
});


// create alert
app.post("/db/alert", function (req, res) {
    db.alert.create(req.body).then(function (response) {
        res.json(response);
    });
});

//delete alert from db
app.delete("/db/alert/:id", function (req, res) {
    db.f.destroy({
        where: {
            id: req.params.id
        }
    }).then(function (response) {
        res.json(response);
    });
});

// update alert
app.post("/db/alert/:id", function (req, res) {

    let alert = {
        email: req.body.email,
        username: req.body.username,
        alertType: req.body.alertType,
        alertLimit: req.body.alertLimit,
        riverId: req.body.riverId
    }
    db.userAccount.update({
        alert},
        {where: {
            id: req.params.id
        }
    }).then(function (response) {
        console.log(response);
        res.json(response[0]);
    });
});

//This is for getting alerts
app.get("/db/alert/:username", function (req, res) {
    db.follow.findAll({
        where: {
            username: req.params.username
        }
    }).then(function (response) {
        res.json(response);
    });

});





db.sequelize.sync({ force: false }).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT http://localhost:" + PORT);
    });
});

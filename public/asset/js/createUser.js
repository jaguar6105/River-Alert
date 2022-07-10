const form = document.getElementById('form');
const cancelButton = document.getElementById('cancelbtn');
const formContain = document.getElementById('inputContain');


// create database call
const createUser = (username, password, email) => {

    let user = {
        username: username,
        userpassword: password,
        accountStatus: "Pending",
        email: email
    }

    $.post("/db/user", user).then(function (res) {
        $("#inputContain").empty();
    });

  }




const cancelClick = (event) => {
    location.assign('/');
}



const createClick = (event) => {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("psword").value;
    let password2 = document.getElementById("psword2").value;
    let email = document.getElementById("email").value;
    if (password != password2) {
        console.log("passwords must be matching.")
    } else {
        $.get("/user/"+username).then(function (res) {
            if(res == "pass") {
                createUser(username, password, email);
            }
            else {
                console.log(res);
            }
            });
    }
}


form.addEventListener('submit', createClick);

cancelButton.addEventListener('click', cancelClick);
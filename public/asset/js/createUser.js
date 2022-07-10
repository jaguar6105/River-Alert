const form = document.getElementById('form');
const cancelButton = document.getElementById('cancelbtn');


// create database call
const createUser = (username, password, email) => {

    let user = {
        username: username,
        userpassword: password,
        confirmed: 0,
        email: email
    }

    $.post("/db/user").then(function (res) {
        console.log(res);
    });

  }




const cancelClick = (event) => {
    location.assign('/');
}


const createClick = (event) => {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("psword").value;
    let email = document.getElementById("email").value;
    createUser(username, password, email);
}


form.addEventListener('submit', createClick);

cancelButton.addEventListener('click', cancelClick);
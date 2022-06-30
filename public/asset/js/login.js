const form = document.getElementById('form');
const cancelButton = document.getElementById('cancelbtn');



// login database call
const checkLogin = (username, password) => {


    $.get("/login/"+username+"/"+password).then(function (res) {
    if(res == "success") {
        document.cookie = "username=" + username +";";
        location.assign('/');
    }
    else {
        console.log(res);
    }
    });

  }



  const loginClick = (event) => {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("psword").value;
    checkLogin(username, password)
}

const cancelClick = (event) => {
    location.assign('/');
}

form.addEventListener('submit', loginClick);

cancelButton.addEventListener('click', cancelClick);
/*alert = {
        email: req.body.email,
        username: req.body.username,
        alertType: req.body.alertType,
        alertLimit: req.body.alertLimit,
        riverId: req.body.riverId,
        active: req.body.active} */


$(document).ready(function () {

        const form = document.getElementById('form');
       // const cancelButton = document.getElementById('cancelbtn');


       const fillForm = () => {
        let username = getCookie("username");
        console.log(username);
        $('#username').text(username);

        $.get("/email/"+username).then(function (res) {
                $('#email').text(res);
                });

       }


       //get cookie value
    const getCookie = (cname) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

        const submitClick = (event) => {
                event.preventDefault();
        }


        fillForm();
        form.addEventListener('submit', submitClick);
});
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

                let email = $('#email').text();
                let username = $('#username').text();
                let alert = getValues();
                let locations = getLocation();

                alert = {
                        email: email,
                        username: username,
                        alertType: alert.type,
                        alertLimit: alert.limit,
                        riverId: locations,
                        active: "active"
                }
                console.log(alert);
                $.post("/alert", alert).then(function (res) {                        
                        location.assign('/alert');
                });
        }


        const getLocation = () => {
                let array = window.location.pathname.split("/");
                return array[2];
              }


              const getValues = () => {
                let values = {
                        type: "",
                        limit: ""
                };

                if($("#date").is(':checked')) {
                        values.type="date";
                        values.limit= $('#calenderdate').val();
                }
                else if($("#data").is(':checked')) {
                        values.type= $('#limit').val();
                        values.limit= $('#limitValue').val()
                }
                console.log(values);
                return values;
              }

        fillForm();
        form.addEventListener('submit', submitClick);
});
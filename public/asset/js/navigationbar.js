

$(document).ready(function () {


    const checkLogin = () => {
        //console.log(getCookie("username"));
        let username = getCookie("username");
        if(username != "") {
            changeLoginDisplay(username)
        }
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




      const changeLoginDisplay = (username) => {
        $("#login_container").empty();
        let card = '<div class="logintext" id="loginText" style="width: 18rem;">Welcome ' + username + '</div>';
        let logout = '<a class="logintext" id="logoutbutton" href="#" style="width: 18rem;">logout</a>';
        $("#login_container").append(card);
        $("#login_container").append(logout);

        let alert = '<a class="logintext" id="alertbutton" href="/alert" style="width: 18rem;">Alerts</a>';
        $("#alert_container").append(alert);
        
        const logoutButton = document.getElementById('logoutbutton');

        logoutButton.addEventListener("click", () => {
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            console.log("Cookie Removed");
            $("#login_container").empty();
            $("#alert_container").empty();
            let login = '<a href="/login" }>login</a>';
            $("#holder").empty();
            $("#login_container").append(login);
        });

      }

    checkLogin();
});
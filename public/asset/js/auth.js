



$(document).ready(function () { 




    const apiCall = (id) => {
    $.post("/db/"+id).then(function (res) {
        if(res == "pass") {
            console.log("Authorized");
        }
        else {
            console.log(res);
        }
        });
    }

    const getLocation = () => {
        let array = window.location.pathname.split("/");
        apiCall(array[2]);
      }

      getLocation();

});
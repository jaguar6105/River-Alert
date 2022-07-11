



$(document).ready(function () { 




    const apiCall = (id) => {
    $.post("/db/"+id).then(function (res) {
        if(res == 1) {
            console.log("Authorized");
            let text = '<h1>User Authorized</h1>'
            $(".output").append(text);
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
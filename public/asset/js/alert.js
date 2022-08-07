$(document).ready(function () {

    
  let alerts = [];
  let id;

    //get follows from db
  const getAlerts = () => {
    let userCookie = getCookie('username');
    if (userCookie) {
      $.get('/db/alert/' + userCookie, (result) => {
        console.log(result);
        alerts = result
        renderRiversData(result);
      });
    }
  };


//get cookie value
const getCookie = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
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

  const renderRiversData = (input) => {
    if (input) {
    $("#holder").empty();
      console.log("Make " + input[0]);
      for (let i = 0; i < input.length; i++) {
        let search = input[i].id;
        //let place = input[i].profile.waterbody + " " + input[i].place.name;
        let card = '<div class="card" id="card' + search + '" style="width: 18rem;">'
        let body = '<div class="card-body" id="card-body' + search + '">';
        let text = '<div>'+ input[i].riverId + " Limit: " + input[i].alertLimit + " active: " + input[i].active +'</div>'
        let editButton =  '<button id=' + search + ' class=editButton data-array = '+i +' data-river=' + search + '>Delete</button>'
        let deleteButton = '<button id=' + search + ' class=deleteButton data-array = '+i +' data-river=' + search + '>Edit</button>'
        // let title = ' <h5 class="card-title">'+search+'</h5>'
        //  button.text() = text+ ", " + state;
        $("#holder").append(card);
        $("#card" + search).append(body);
        $("#card-body" + search).append(text);
        $("#card-body" + search).append(editButton);
        $("#card-body" + search).append(deleteButton);

        // $("#clickriver"+search).append(title);
      }
      let eBut = document.getElementsByClassName("editButton");
      let dBut = document.getElementsByClassName("deleteButton");
      for (let k = 0; k < dBut.length; k++) {
        //console.log(fBut[k].dataset.follow);
        dBut[k].addEventListener("click", deleteClick);
        eBut[k].addEventListener("click", editClick);
      }
    }
    else {
      $("#holder").append('<div id="card" style="width: 18rem;">The location you are looking for is invalid.  Try something else.</div>');
    }

  }

  //delete an alert
  const deleteClick = (evt) => {
    //let userCookie = getCookie('username');
    let id = evt.currentTarget.dataset.river;
    console.log(id);
    $.ajax({
        method: "DELETE",
        url: "/db/alert/" + id
      }).then((result) => {
        console.log(result);
        getAlerts();
      });
  }

  //edit an alert
  const editClick = (evt) => {
    //let userCookie = getCookie('username');
  }

  getAlerts();

});
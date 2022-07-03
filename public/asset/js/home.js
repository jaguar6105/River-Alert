//const { format } = require("mysql2");


$(document).ready(function () {

  let favorites = [];


  const getFollows = () => {
    let userCookie = getCookie('username');
    if (userCookie) {
      $.get('/db/follow/' + userCookie, (result) => {
        console.log(userCookie);
        console.log(result);
        favorites = result
        /*for (let i = 0; i < result.length; i++) {
          favorites.push(result[i]);
        }*/
      });
    }
  };


  //follow a station
  const followClick = (evt) => {
    let userCookie = getCookie('username');
    console.log("Followed");
    //console.log(evt.currentTarget.dataset.river);
    let search = {
      username: userCookie,
      riverId: evt.currentTarget.dataset.river
    };

    if (evt.currentTarget.dataset.follow == "unfollow") {
      follow(search);
    }
    else if (evt.currentTarget.dataset.follow == "followed") {
      unfollow(search);
    }
  }

  //follow db call
  const follow = (search) => {
    $.post("/db/follow", search)
      .then(() => {
        console.log("Followed");
        $("#" + search.riverId).text("Unfollow");
        $("#" + search.riverId).attr('data-follow', "followed");
        getFollows();
      });
  }


  //unfollow a station
  const unfollow = (search) => {
    $.ajax({
      url: "/db/follow/" + search.username + "/" + search.riverId,
      type: 'DELETE',
      success: function (result) {
        console.log("Delete");
        $("#" + search.riverId).text("Follow");
        $("#" + search.riverId).attr('data-follow', "unfollow");
        getFollows();
      }
    });
  }

  const renderCard = () => {

  }


  const renderRiversData = (input, location) => {
    if (input) {
      for (let i = 0; i < input.length; i++) {
        let flooded = 'notFlooded';
        let status = input[i].ob.status;
        if (status == 'action' || status == 'minor') {
          flooded = 'flooded';
        }
        let search = input[i].id;
        let place = input[i].profile.waterbody + " " + input[i].place.name;
        let card = '<div class="card" id="card' + search + '" style="width: 18rem;">'
        let body = '<div class="card-body ' + flooded + '" id="card-body' + search + '">';
        let button = ' <a href="/river/' + search + '" id="clickriver"' + search + ' data-river=' + search + ' class="btn btn-primary">' + place + '</a>';
        let followButton = '<button id=' + search + ' class=followButton data-river=' + search + ' data-follow=unfollow>Follow</button>'
        // let title = ' <h5 class="card-title">'+search+'</h5>'
        //  button.text() = text+ ", " + state;
        let fButtonId = "Follow";
        for (let j = 0; j < favorites.length; j++) {
          if (search == favorites[j].riverId) {
            fButtonId = "Followed";
            followButton = '<button id=' + search + ' class=followButton data-river=' + search + ' data-follow=followed>Unfollow</button>';
          }
        }
        $("#holder").append(card);
        $("#card" + search).append(body);
        $("#card-body" + search).append(button);
        $("#card-body" + search).append(followButton);

        // $("#clickriver"+search).append(title);
      }
      let fBut = document.getElementsByClassName("followButton");
      console.log(fBut);
      for (let k = 0; k < fBut.length; k++) {
        //console.log(fBut[k].dataset.follow);
          fBut[k].addEventListener("click", followClick);
      }
    }
    else {
      $("#holder").append('<div id="card" style="width: 18rem;">The location you are looking for is invalid.  Try something else.</div>');
    }

  }

  // Gets river data from api and renders it
  const getRiverData = (text, state) => {
    let search = text + "," + state;

    let client = "Dh7RPSpIbn5Nt8vCSnk5K";
    let secret = "34hU5GqA4MmKEOzMynoYvL6qL2uFUNKVgQVadnFJ";


    let url = "https://api.aerisapi.com/rivers/closest?p=" + search + "&format=json&radius=25mi&limit=10&client_id=" + client + "&client_secret=" + secret;
    console.log(url);

    $.ajax({
      url: url
    })
      .done(function (json) {
        if (json.success == true) {
          let ob = json.response;
          //          console.log(ob);
          renderRiversData(ob, search);
        }
        else {
          renderRiversData(undefined);
        }
      });
  }

  // Gets river data from api and renders it
  const getRiverDataById = (text) => {
    let search = text;

    let client = "Dh7RPSpIbn5Nt8vCSnk5K";
    let secret = "34hU5GqA4MmKEOzMynoYvL6qL2uFUNKVgQVadnFJ";


    let url = "https://api.aerisapi.com/rivers/?p=" + search + "&format=json&radius=25mi&limit=10&client_id=" + client + "&client_secret=" + secret;
    console.log(url);

    $.ajax({
      url: url
    })
      .done(function (json) {
        if (json.success == true) {
          let ob = json.response;
          //          console.log(ob);
          renderRiversData(ob, search);
        }
        else {
          renderRiversData(undefined);
        }
      });
  }



  $("#state").change(function () {
    id = $(this).children(":selected").attr("value");
  });

  $("#search-button").click(function () {
    $("#holder").empty();
    let text = document.getElementById("rivername").value;;
    getRiverData(text, id);
  });

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

  getFollows();
});

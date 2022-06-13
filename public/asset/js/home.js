

$(document).ready(function () {

  let id = "pa";
  //get favs

  // Gets river data from api and renders it
  const getRivers = () => {
    $.get("/db/river", renderData);
  };

  //will render individual stations
  const renderData = (data) => {
    console.log(data);
  };



const renderRiversData = (text, state) => {
  let search = text+","+state;
  let card = '<div class="card" id="card" style="width: 18rem;">'
  let body = '<div class="card-body" id="card-body">';
  let button = ' <a href="/river/'+search+'" id="clickriver" data-river='+ search + 'class="btn btn-primary">';
  let title = ' <h5 class="card-title">'+text + ', '+state+'</h5>'
//  button.text() = text+ ", " + state;
  $("#holder").append(card);
  $("#card").append(body);
  $("#card-body").append(button);
  $("#clickriver").append(title);

}

// Gets river data from api and renders it
const getRiverData = (location) => {

  let client = "Dh7RPSpIbn5Nt8vCSnk5K";
  let secret = "34hU5GqA4MmKEOzMynoYvL6qL2uFUNKVgQVadnFJ";


  let url = "https://api.aerisapi.com/rivers/" + location + "?client_id=" + client + "&client_secret=" + secret;
  console.log(url);

  $.ajax({
    url: url
  })
    .done(function (json) {
      if (json.success == true) {
        let ob = json.response.ob;
        if (!ob) {
          ob = "The data is unavailable. Try again later.";
        }
        else {
          //          console.log(ob);
          renderRiversData(ob);
        }
      }
    });
}

$("#state").change(function() {
 id = $(this).children(":selected").attr("value");
});

$( "#search-button" ).click(function() {
  $("#holder").empty();
  let text = document.getElementById("rivername").value;;
  renderRiversData(text, id);
});
});
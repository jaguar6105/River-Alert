//const { format } = require("mysql2");


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



const renderRiversData = (input, location) => {
  if (input){
    for(let i=0; i<input.length; i++){
      let flooded = 'notFlooded';
      let status = input[i].ob.status;
      if(status == 'action'||status == 'minor') {
        flooded = 'flooded';
      }
  let search = input[i].id;
  let place = input[i].profile.waterbody + " " + input[i].place.name;
  let card = '<div class="card" id="card'+search+'" style="width: 18rem;">'
  let body = '<div class="card-body ' + flooded + '" id="card-body'+search+'">';
  let button = ' <a href="/river/'+search+'" id="clickriver"'+search+' data-river='+ search + ' class="btn btn-primary">'+place+'</a>';
 // let title = ' <h5 class="card-title">'+search+'</h5>'
//  button.text() = text+ ", " + state;
  $("#holder").append(card);
  $("#card"+search).append(body);
  $("#card-body"+search).append(button);
 // $("#clickriver"+search).append(title);
   }
}
else {
  $("#holder").append('<div id="card" style="width: 18rem;">The location you are looking for is invalid.  Try something else.</div>');
}

}

// Gets river data from api and renders it
const getRiverData =  (text, state) => {
  let search = text+","+state;

  let client = "Dh7RPSpIbn5Nt8vCSnk5K";
  let secret = "34hU5GqA4MmKEOzMynoYvL6qL2uFUNKVgQVadnFJ";

  
  let url = "https://api.aerisapi.com/rivers/closest?p=" + search + "&format=json&radius=25mi&limit=10&client_id=" + client + "&client_secret="+ secret;
    console.log(url);

  $.ajax({
    url: url
 })
 .done(function(json) {
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

$("#state").change(function() {
 id = $(this).children(":selected").attr("value");
});

$( "#search-button" ).click(function() {
  $("#holder").empty();
  let text = document.getElementById("rivername").value;;
  getRiverData(text, id);
});
});

const getRiverData =  (lat, long) => {
let location;

  return location;
}
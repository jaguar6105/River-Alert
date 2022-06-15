

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
  let search = input.id;
  let card = '<div class="card" id="card" style="width: 18rem;">'
  let body = '<div class="card-body" id="card-body">';
  let button = ' <a href="/river/'+location+'" id="clickriver" data-river='+ search + 'class="btn btn-primary">';
  let title = ' <h5 class="card-title">'+search+'</h5>'
//  button.text() = text+ ", " + state;
  $("#holder").append(card);
  $("#card").append(body);
  $("#card-body").append(button);
  $("#clickriver").append(title);
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

  
  let url = "https://api.aerisapi.com/rivers/" + search + "?format=json&client_id=" + client + "&client_secret="+ secret;
    console.log(url);

  $.ajax({
    url: url
 })
 .done(function(json) {
       if (json.success == true) {
          let ob = json.response[0];
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


$(document).ready(function () {

  //get favs

  // Gets river data from api and renders it
  const getRivers = () => {
    $.get("/db/river", renderData);
  };

  //will render individual stations
  const renderData = (data) => {
    console.log(data);
  };



  //search rivers
  const searchRivers = () => {
    let name = document.getElementById('rivername').innerHTML;
    let url = "/db/river/" + name;

    $.get(url, renderData);
  };

  //search button
  document.getElementById('search-button').addEventListener('click', function (event) {
    event.preventDefault();
    searchRivers();
  });
});

const renderRiversData = (data) => {

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


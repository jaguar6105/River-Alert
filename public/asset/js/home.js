

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
  let url = "/db/river/"+ name;

  $.get(url, renderData);
};

  //search button
  document.getElementById('search-button').addEventListener('click', function (event) {
    event.preventDefault();
    searchRivers();
  });
});
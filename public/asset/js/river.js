
const $noteContent = $(".output");


//test number = 01646500
const id = '01646500';

const getRiver = () => {
  console.log(id);
  return $.ajax({
    url: "/api/river/"+id,
    method: "GET",
  });
};

//renders the data into
const renderRiverData = (river) => {
    let data = river;
    console.log(river);
    $("<span>"+data+"</span>").appendTo($noteContent);
}

// Gets river data from api and renders it
const getRiverData = (location) => {

  let client = "Dh7RPSpIbn5Nt8vCSnk5K";
  let secret = "34hU5GqA4MmKEOzMynoYvL6qL2uFUNKVgQVadnFJ";

  
  let url = "https://api.aerisapi.com/rivers/" + location + "?client_id=" + client + "&client_secret="+ secret;
    console.log(url);

  $.ajax({
    url: url
 })
 .done(function(json) {
       if (json.success == true) {
          let ob = json.response.ob;
          if(!ob) {
            ob =  "The data is unavailable. Try again later."; 
          }
//          console.log(ob);
          renderRiverData(ob);
       }
       else {
        let ob =  "The data is unavailable. Try again later."; 
        renderRiverData(ob);
       }
   });
  }

  getRiverData("richmond,va");
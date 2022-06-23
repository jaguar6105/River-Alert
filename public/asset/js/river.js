
const $noteContent = $(".output");





//renders the data into
const renderRiverData = (river) => {
    let data;
    if(river==undefined) {
      data =  "The data is unavailable. Try again later."; 
      $("#river-name").text(data);
    }
    else {
      console.log(river);
      data = river.profile.waterbody;
      $("#river-name").text(data);
    $("<span>"+river.ob.heightFT+"ft</span>").appendTo($noteContent);
    }

}

// Gets river data from api and renders it
const getRiverData = (location) => {

  let client = "Dh7RPSpIbn5Nt8vCSnk5K";
  let secret = "34hU5GqA4MmKEOzMynoYvL6qL2uFUNKVgQVadnFJ";

  
  let url = "https://api.aerisapi.com/rivers/" + location + "?format=json&client_id=" + client + "&client_secret="+ secret;
    console.log(url);

  $.ajax({
    url: url
 })
 .done(function(json) {
       if (json.success == true) {
          let ob = json.response;
          console.log(json);
          if(!ob) {
            ob =  "The data is unavailable. Try again later."; 
          }
//          console.log(ob);
          renderRiverData(ob);
       }
       else {
        let ob =  undefined; 
        renderRiverData(ob);
       }
   });
  }

  const getLocation = () => {
    let array = window.location.pathname.split("/");
      console.log(array[2]);
      getRiverData(array[2]);
}

  getLocation();
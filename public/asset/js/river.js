
const $noteContent = $(".output");





//renders the data into
const renderRiverData = (river) => {
  let data;
  if (river == undefined) {
    data = "The data is unavailable. Try again later.";
    $("#river-name").text(data);
  }
  else {
    console.log(river);
    data = river.profile.waterbody;
    $("#river-name").text(data);
    $("<span>" + river.ob.heightFT + "ft</span>").appendTo($noteContent);
    let status = river.ob.status;
    if (status == 'action' || status == 'minor') {
      //$("#river-name").text(data);
      console.log("test");
      if(river.ob.impact){
      $("<h3>" + river.ob.impact.text + "</h3").appendTo($noteContent);
      }
    }
  }

}

// Gets river data from api and renders it
const getRiverData = (location) => {

  let client = "qIoVTRHTK046FZUZWzzWE";
  let secret = "2Vei2BNzwGMltl4KjQ8RrvgwKSdmLofRQQgJwC42";


  let url = "https://api.aerisapi.com/rivers/" + location + "?format=json&client_id=" + client + "&client_secret=" + secret;
  console.log(url);

  $.ajax({
    url: url
  })
    .done(function (json) {
      if (json.success == true) {
        let ob = json.response;
        console.log(json);
        if (!ob) {
          ob = "The data is unavailable. Try again later.";
        }
        //          console.log(ob);
        renderRiverData(ob);
      }
      else {
        let ob = undefined;
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
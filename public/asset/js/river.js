const $noteContent = $(".output");

// activeNote is used to keep track of the note in the textarea
const id = 1;
// A function for getting all notes from the db
const getRiver = () => {
  console.log(id);
  return $.ajax({
    url: "/api/river/"+id,
    method: "GET",
  });
};


const renderRiverData = (river) => {
    let data = river;
    $(data).appendTo($noteContent);
}

// Gets river data from api and renders it
const getAndRenderNotes = () => {
    const url = 'http://waterservices.usgs.gov/nwis/dv/';
    $.ajax({
        type: 'GET', 
        url: url,
        data: {
        format: 'json',
        sites: '01646500',
        siteStatus: 'all'},        
        success: function(data){
            renderRiverData(data);
      },
    error: renderRiverData("API is unavailable.")
    });
    //return getRiver().then(renderRiverData);
  };

  getAndRenderNotes();
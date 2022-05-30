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
        sites: id,
        siteStatus: 'all'},        
        success: function(data){
            renderRiverData(data);
      },
    error: renderRiverData("API is unavailable.")
    });
    //return getRiver().then(renderRiverData);
  };

  getAndRenderNotes();
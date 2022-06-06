





// Gets river data from api and renders it
const getAndRenderNotes = () => {
    $.get("/db/river", renderData);
  };

const renderData = (data) => {
    console.log(data);

};

  getAndRenderNotes();
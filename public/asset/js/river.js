
const $noteContent = $(".output");
const createButton = document.getElementById('alertBut');



//get measures for grapth
const getMeasures = (river) => {
  console.log(river);
  $.get('/db/measure/' + river.id, (result) => {
    run(river, result);
  });
}

const saveDataBase = (value) => {
  let river = {
    riverValue: value.id,
    riverId: value.ob.heightFT
  }
  $.post("/measure", river).then(function (res) {  
    renderRiverData(value);                      
});
}

//renders the data into
const renderRiverData = (river) => {
  let data;
  if (river == undefined) {
    data = "The data is unavailable. Try again later.";
    $("#river-name").text(data);
  }
  else {
    console.log(river);
    getMeasures(river);
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

const createClick = (event) => {
  let array = window.location.pathname.split("/");
  location.assign('/createAlert/' + array[2]);
}


async function run(river, result) {
  // Load and plot the original input data that we are going to train on.
  const data = result;
  const values = data.map(d => ({
    x: d.id,
    y: d.riverId,
  }));
  console.log(values);

  const surface = { name: 'Height of ' + river.place.name, tab: 'Charts' };

  tfvis.render.scatterplot(
    {name: 'Height of ' + river.place.name},
    {values: values},
    {
      xLabel: 'Date',
      yLabel: 'Height',
      height: 500
    }
  );

  // More code will be added below
  // Make some predictions using the model and compare them to the
// original data
// Convert the data to a form we can use for training.
const tensorData = convertToTensor(data);
const {inputs, labels} = tensorData;

let model = createModel();

// Train the model
await trainModel(model, inputs, labels);
console.log('Done Training');
testModel(model, data, tensorData);
}

//document.addEventListener('DOMContentLoaded', run);


function createModel() {
  // Create a sequential model
  const model = tf.sequential();

  // Add a single input layer
  model.add(tf.layers.dense({inputShape: [1], units: 1, useBias: true}));

  // Add an output layer
  model.add(tf.layers.dense({units: 1, useBias: true}));

  return model;
}

/**
 * Convert the input data to tensors that we can use for machine
 * learning. We will also do the important best practices of _shuffling_
 * the data and _normalizing_ the data
 * MPG on the y-axis.
 */
 function convertToTensor(data) {
  // Wrapping these calculations in a tidy will dispose any
  // intermediate tensors.

  return tf.tidy(() => {
    // Step 1. Shuffle the data
    tf.util.shuffle(data);

    console.log(data);

    // Step 2. Convert data to Tensor
    const inputs = data.map(d => d.id)
    const labels = data.map(d => d.riverId);

    const inputTensor = tf.tensor2d(inputs, [inputs.length, 1]);
    const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

    //Step 3. Normalize the data to the range 0 - 1 using min-max scaling
    const inputMax = inputTensor.max();
    const inputMin = inputTensor.min();
    const labelMax = labelTensor.max();
    const labelMin = labelTensor.min();


    const normalizedInputs = inputTensor.sub(inputMin).div(inputMax.sub(inputMin));
    const normalizedLabels = labelTensor.sub(labelMin).div(labelMax.sub(labelMin));

    return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
      labelMax,
      labelMin,
    }
  });
}

async function trainModel(model, inputs, labels) {
  // Prepare the model for training.
  model.compile({
    optimizer: tf.train.adam(),
    loss: tf.losses.meanSquaredError,
    metrics: ['mse'],
  });

  const batchSize = 32;
  const epochs = 50;

  return await model.fit(inputs, labels, {
    batchSize,
    epochs,
    shuffle: true,
    callbacks: tfvis.show.fitCallbacks(
      { name: 'Training Performance' },
      ['loss', 'mse'],
      { height: 200, callbacks: ['onEpochEnd'] }
    )
  });
}


function testModel(model, inputData, normalizationData) {
  const {inputMax, inputMin, labelMin, labelMax} = normalizationData;

  // Generate predictions for a uniform range of numbers between 0 and 1;
  // We un-normalize the data by doing the inverse of the min-max scaling
  // that we did earlier.
  const [xs, preds] = tf.tidy(() => {

    const xs = tf.linspace(0, 1, 100);
    const preds = model.predict(xs.reshape([100, 1]));

    const unNormXs = xs
      .mul(inputMax.sub(inputMin))
      .add(inputMin);

    const unNormPreds = preds
      .mul(labelMax.sub(labelMin))
      .add(labelMin);

    // Un-normalize the data
    return [unNormXs.dataSync(), unNormPreds.dataSync()];
  });


  const predictedPoints = Array.from(xs).map((val, i) => {
    return {x: val, y: preds[i]}
  });

  const originalPoints = inputData.map(d => ({
    x: d.id, y: d.riverId,
  }));


  tfvis.render.scatterplot(
    {name: 'Model Predictions vs Original Data'},
    {values: [originalPoints, predictedPoints], series: ['original', 'predicted']},
    {
      xLabel: 'Date',
      yLabel: 'Height',
      height: 500
    }
  );
}

createButton.addEventListener('click', createClick);

//get cookie value
const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


const checkLogin = () => {
  //console.log(getCookie("username"));
  let username = getCookie("username");
  if(username != "") {
      createButton.classList.remove('hidden');
  }
}

checkLogin();

getLocation();
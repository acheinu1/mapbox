//  mapbox cdn===================================================

mapboxgl.accessToken =
  'pk.eyJ1IjoiYWNoZWludWUiLCJhIjoiY2tmM25yaXp2MDR6dDJybm9qcTZyMHY2MiJ9.6v7PIIvPk96ZuH1nrNmsEA';
    // Set bounds to New York, New York
var bounds = [
    [-712.7744293212891, 9.114300517448383], // Southwest coordinates
    [ -712.331714630127, 9.412822817158808] // Northeast coordinates
    ];
     

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
//   zoom:6,
  center: [-712.6604461669922, 9.152265159854796],
zoom: 15,

});
//  mapbox cdn===================================================


updateMap = () => {
  fetch('/assets/geojson/data.json')
    .then((response) => response.json())
    .then((rsp) => {
      console.log(rsp.features);
      rsp.features.forEach((element) => {
        longitude = element.geometry.coordinates[0];
        latitude = element.geometry.coordinates[1];

        // to change markers colours based on payment status================= line 11-17
        cases = element.properties.status;
        if (cases === "paid"){
            color = "rgb(0,128,0)";
        }

        else{
            // color = `rgb(${cases}, 0, 0)`;
            color = "rgb(255,0,0)";
        }

        // Mark on the map
        new mapboxgl.Marker({
            draggable: false,
            color: color
        }).setLngLat([longitude, latitude])
        .addTo(map); 
      });
    });
};

updateMap();


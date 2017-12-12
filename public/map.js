$('document').ready(function () {
    console.log('bananas');
  });

var currentLoc = {
  lng: 0,
  lat: 0
}

mapboxgl.accessToken =        'pk.eyJ1IjoiY2xvdWR2dSIsImEiOiJjamIyZ3hzeWUxaGtlMnduMnF3Mm56eTI0In0.f-dt5_iZmOhTgDB9MOrU0Q';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/cloudvu/cjb2izk4r5btc2so0mhhejjqa',
    center: [-105.2838747,40.0165447],
    pitch: 60,
    zoom: 9,
    bearing: -17.6
  });

map.on('load', function () {

    map.addLayer({
        'id': 'terrain-data',
        'type': 'line',
        "source": {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-terrain-v2'
        },
        "source-layer": "contour",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#ff69b4",
            "line-width": 1
        }
      });
  });

  function removePopUps(){
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
  };

  // map.on('mousemove', function (e) {
  //   document.getElementById('info').innerHTML =
  //       // e.lngLat is the longitude, latitude geographical position of the event
  //       JSON.stringify(e.lngLat);
  // });

  map.on('click', function(e) {
    removePopUps();
    let loc = e.lngLat
    currentLoc.lng = loc.lng;
    currentLoc.lat = loc.lat;
    console.log(currentLoc);
    console.log(currentLoc.lng, currentLoc.lat);
    var popup = new mapboxgl.Popup({closeOnClick: false})
      .setLngLat(currentLoc)
      .setHTML('<button class="trigger-a">Check Forecast</button><br><button class="trigger-b">Add to Favorites</button>')
      .addTo(map);
  });

  $('#map').on('click', '.trigger-a', function(ev){
    console.log('you have clicked on forecast');

    window.location = './data.html'
  })

  $('#map').on('click', '.trigger-b', function(ev){
    console.log(currentLoc);
    $.post('/add-location', currentLoc, (success) => {
      console.log(success);
    })
    console.log('you have clicked on add location');
  })

// MapboxGeocoder

  map.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  }));

module.exports = {location}

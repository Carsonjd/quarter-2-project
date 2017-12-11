$('document').ready(function() {
  console.log("bananas");
});

var featureBlank = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": []
    },
    "properties": {
      "address": "",
      "city": "",
      "country": "",
    }
  };

var places =
  JSON.parse(localStorage.getItem('places')) ||
  {
    'type':'FeatureCollection',
    'features':[]
  };

mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fyc29uamQiLCJhIjoiY2o5YmxuYXkyMWVjMTMzbzdsajJnc3kycyJ9.xoTkOio_DVGEpXsE97I3Zg';

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/carsonjd/cj9bo5zhx4i4p2rmk9c5xrsax',
center: [-105.2838747,40.0165447],
pitch: 60,
zoom: 10,
bearing: -17.6
});
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: false
}));

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
});

map.addControl(geocoder);

function removePopUps(){
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();
};

var menuOpen = false;
function menuView (){
  menuOpen = true;
  $('#menu-main').text('hide');
  $('.red-glow-circle').animate({
    'opacity': '0.9'
  },300);
  $('body').css('background-blend-mode', 'color-dodge');
  mapDim();
  $('h1').animate({
    'margin-top': '9%'
  }, 300);
  $('.drop-main').animate({
    'top': '5%'
  },300);
  $('.about').css('opacity', '0.1');
  $('.locations').css('opacity', '0.1');
  $('.form-container').animate({
    'opacity': '0.1'
  },300);
};

function menuHide (){
  menuOpen = false;
  mapBright();
  $('#menu-main').text('menu');
  $('.red-glow-circle').animate({
    'opacity': '0.35'
  },300);
  $('body').css('background-blend-mode', 'normal');
  $('.drop-main').animate({
    'top': '-75%'
  },300);
  $('h1').animate({
    'margin-top': '300%'
  }, 300);
  $('.about').css('opacity', '0.6');
  $('.locations').css('opacity', '0.9');
  $('.form-container').animate({
    'opacity': '0.9'
  },300);
};

function homeShow (){
  $('body').css('background-image','url(DSC00858.jpg)');
  $('.about').animate({
    'opacity': '0.6'
  },300).fadeIn(300);
};

function homeHide (){
  $('body').css('background-image','url()');
  $('.about').fadeOut(300);
};

function mapShow (){
  $('#map').css('display', 'block');
  $('body').css('background-image', 'url()');
  $('#map').animate({
    'opacity':'1.0'
  }, 300);
};

function mapHide (){
  $('#map').css('display', 'none');
};

function mapDim (){
  $('#map').animate({
    'opacity':'0.3'
  }, 300);
};

function mapBright (){
  $('#map').animate({
    'opacity':'1.0'
  }, 300);
};

function formShow (){
  $('.form-container').animate({
    'top': '30%'
  },300);
};

function formHide (){
  $('.form-container').animate({
    'top': '100%'
  },300);
};

function locationListShow (){
  $('.locations').animate({
    'top': '10%'
  },300).fadeIn(100);
};

function locationListHide (){
  $('.locations').animate({
    'top':'100%'
  },300).fadeOut(500);
};

//Menu click/tap events
$('#menu-main').click(function(event){
  if(menuOpen === false){
    menuView();
  } else {
    menuHide();
  }
});

$('#menu-home').click(function(event){
  homeShow();
  mapHide();
  menuHide();
  locationListHide();
  formHide();
});

$('#menu-map').click(function(event){
  menuHide();
  mapShow();
  homeHide();
  locationListHide();
  formHide();
});

$('#menu-locations').click(function(event){
  removePopUps();
  mapDim();
  menuHide();
  homeHide();
  formHide();
  locationListShow();
});

$('#locations').click(function(event){
  locationListHide();
  mapShow();
});

$('#menu-add').click(function(event){
  removePopUps();
  homeHide();
  formShow();
  menuHide();
  locationListHide();
  mapDim();
});

$('#your-location').click(function(event){
  featureBlankReset(featureBlank);
  $('.mapboxgl-ctrl-icon.mapboxgl-ctrl-geolocate').trigger('click');
  formHide();
  navigator.geolocation.getCurrentPosition(function(position){
    var locationMarker = null;
      if (locationMarker){
         return;
        }
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    featureBlank.geometry.coordinates.push(lng);
    featureBlank.geometry.coordinates.push(lat);
    },
      function(error) {
        console.log("Error: ", error);
      },
    {
     enableHighAccuracy: true
   });
  var nameField = $('<input>').attr({'type':'text', 'placeholder':'Location Name','id':'nameinput' }).addClass('location-input-item');
  var descField = $('<input>').attr({'type':'text', 'placeholder':'Add A Description','id':'description-field' }).addClass('location-input-item');
  var submit = $('<div>').attr('id', 'location-submit').text('Add');
  $('#location-input').append(nameField)
    .append(descField)
    .append(submit);
  $('#location-input').css('display', 'flex');
});

$('#location-input').on('click','#location-submit',function(){
  var places =
    JSON.parse(localStorage.getItem('places')) ||
    {
      'type':'FeatureCollection',
      'features':[]
    };
  var props = featureBlank.properties;
    props.city = $('#nameinput').val();
    props.address = $('#description-field').val();
    places.features.unshift(featureBlank);
    localStorage.setItem('places', JSON.stringify(places));
    $('#location-input').empty();
    $('#location-input').css('display', 'none');
    mapShow();
    buildLocationList(places);
    createMarkers();
    createPopUp(places.features[0]);
});

$('#by-address').click(function(){
  adding = true
  removePopUps();
  $('.mapboxgl-ctrl-geocoder').css('display', 'flex');
  formHide();
  mapBright();
  $('.mapboxgl-ctrl-geocoder').animate({
     'opacity': '0.8'
  },300);
});

var adding = false;

geocoder.on('result', function(event) {
  var places =
    JSON.parse(localStorage.getItem('places')) ||
    {
      'type':'FeatureCollection',
      'features':[]
    };
  if(adding === true){
  featureBlankReset(featureBlank);
  $('.mapboxgl-ctrl-geocoder').css('display','none');
  var props = featureBlank.properties;
    props.city = event.result.text;
    props.address = event.result.place_name;
    featureBlank.geometry.coordinates = event.result.geometry.coordinates;
    places.features.unshift(featureBlank);
    localStorage.setItem('places', JSON.stringify(places));
    mapShow();
    buildLocationList(places);
    createMarkers();
    createPopUp(places.features[0]);
    adding = false
  }
});

function featureBlankReset(obj){
  obj.geometry.coordinates = [];
  var props = obj.properties;
  props.address = "";
  props.city = "";
  props.country = "";
  return obj;
};

// map.on('click', function(event){
//   JSON.stringify(event.lngLat);
//   var features = map.queryRenderedFeatures(event.point);
// });

function flyToLocation(item) {
  map.flyTo({
    center: item.geometry.coordinates,
    zoom: 14
  });
};

function createPopUp(item) {
  removePopUps();
  var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(item.geometry.coordinates)
    .setHTML('<h5>'+item.properties.city+'</h5>' +
      '<h4>' + item.properties.address + '</h4>')
    .addTo(map);
};

function buildLocationList(data){
  var places =
    JSON.parse(localStorage.getItem('places')) ||
    {
      'type':'FeatureCollection',
      'features':[]
    };
  $('#locations').empty();
  for (let i=0; i<data.features.length; i++) {
    var prop = data.features[i].properties;
    var locations = document.getElementById('locations');
    var location = locations.appendChild(document.createElement('div'));
    location.className = 'item';
    location.id = 'location-' + i;

    var details = location.appendChild(document.createElement('div'));
    details.innerHTML = prop.city;

    var link = location.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.dataPosition = i;
    link.innerHTML = prop.address;

    link.addEventListener('click', function(event) {
      var clickedLocation = places.features[this.dataPosition];
      flyToLocation(clickedLocation);
      createPopUp(clickedLocation);
      var activeItem = document.getElementsByClassName('active');
        // if (activeItem[0]) {
        //   activeItem[0].classList.remove('active');
        // }
      this.parentNode.classList.add('active');
    });
  };
};

map.on('load', function(event) {
map.addSource('places', {
  type: 'geojson',
  data: places
});
createMarkers();
var layers = map.getStyle().layers.reverse();
  var labelLayerIdx = layers.findIndex(function (layer) {
      return layer.type !== 'symbol';
  });
  var labelLayerId = labelLayerIdx !== -1 ? layers[labelLayerIdx].id : undefined;
  map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 14,
      'paint': {
          'fill-extrusion-color': '#640808',
          'fill-extrusion-height': {
              'type': 'identity',
              'property': 'height'
          },
          'fill-extrusion-base': {
              'type': 'identity',
              'property': 'min_height'
          },
          'fill-extrusion-opacity': .6
      }
  }, labelLayerId);
});

function createMarkers(){
places.features.forEach(function(marker){
  var element = document.createElement('div');
  element.classList.add('marker');
  new mapboxgl.Marker(element, {
      // offset: [-30, -40]
    })
    .setLngLat(marker.geometry.coordinates)
    .addTo(map);
  element.addEventListener('click', function(event){
    var activeItem = $('active');
    flyToLocation(marker);
    createPopUp(marker);
    event.stopPropagation();
    // if (activeItem[0]) {
    //   activeItem[0].classList.remove('active');
    // }
    var location = document.getElementById('location-' +   places.features.indexOf(marker));
    location.classList.add('active');
  });
});
};
buildLocationList(places);

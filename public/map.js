var userLocations;

$('document').ready(function() {
  console.log('bananas');

  //started here

  var menuOpen = false;

  function menuView() {
    menuOpen = true;
    $('#menu-main').text('hide');
    $('.red-glow-circle').animate({
      'opacity': '0.9'
    }, 300);
    $('body').css('background-blend-mode', 'color-dodge');
    mapDim();
    $('h1').animate({
      'margin-top': '9%'
    }, 300);
    $('.drop-main').animate({
      'top': '5%'
    }, 300);
    $('.about').css('opacity', '0.1');
    $('.locations').css('opacity', '0.1');
    $('.form-container').animate({
      'opacity': '0.1'
    }, 300);
  };

  function menuHide() {
    menuOpen = false;
    mapBright();
    $('#menu-main').text('menu');
    $('.red-glow-circle').animate({
      'opacity': '0.35'
    }, 300);
    $('body').css('background-blend-mode', 'normal');
    $('.drop-main').animate({
      'top': '-75%'
    }, 300);
    $('h1').animate({
      'margin-top': '300%'
    }, 300);
    $('.about').css('opacity', '0.6');
    $('.locations').css('opacity', '0.9');
    $('.form-container').animate({
      'opacity': '0.9'
    }, 300);
  };

  function homeShow() {
    $('body').css('background-image', 'url(DSC00858.jpg)');
    $('.about').animate({
      'opacity': '0.6'
    }, 300).fadeIn(300);
  };

  function homeHide() {
    $('body').css('background-image', 'url()');
    $('.about').fadeOut(300);
  };

  function mapShow() {
    $('#map').css('display', 'block');
    $('body').css('background-image', 'url()');
    $('#map').animate({
      'opacity': '1.0'
    }, 300);
  };

  function mapHide() {
    $('#map').css('display', 'none');
  };

  function mapDim() {
    $('#map').animate({
      'opacity': '0.3'
    }, 300);
  };

  function mapBright() {
    $('#map').animate({
      'opacity': '1.0'
    }, 300);
  };

  function formShow() {
    $('.form-container').animate({
      'top': '30%'
    }, 300);
  };

  function formHide() {
    $('.form-container').animate({
      'top': '100%'
    }, 300);
  };

  function locationListShow() {
    // $('.locations').animate({
    //   'top': '10%'
    // }, 300).fadeIn(100);
    $('.location-info').css('display', 'block');
    $.get('/user-favs', (result) => {
      createLocationList(result.locations);
    })
  };

  function locationListHide() {
    $('.locations').animate({
      'top': '100%'
    }, 300).fadeOut(500);
  };

  function createLocationList(locations) {

    locations.forEach((loc) => {
      console.log(loc);
      $(`<p class= "fav-loc">${loc.location_name}</p><button class="fly-here" id="${loc.id-1}">Fly Here</button><button class="show-weather">Show Weather</button>`).appendTo('.favs-container')
    })
  }

  //Menu click/tap events
  $('#menu-main').click(function(event) {
    if (menuOpen === false) {
      menuView();
    } else {
      menuHide();
    }
  });

  $('#menu-home').click(function(event) {
    homeShow();
    mapHide();
    menuHide();
    locationListHide();
    formHide();
  });

  $('#menu-map').click(function(event) {
    menuHide();
    mapShow();
    homeHide();
    locationListHide();
    formHide();
  });

  $('#menu-favorites').click(function(event) {
    removePopUps();
    mapDim();
    menuHide();
    homeHide();
    formHide();
    locationListShow();
  });

  $('#locations').click(function(event) {
    locationListHide();
    mapShow();
  });

  $('#menu-add').click(function(event) {
    removePopUps();
    homeHide();
    formShow();
    menuHide();
    locationListHide();
    mapDim();
  });

  //ended here

  $.get('/user-favs', (result) => {
    console.log('your favorite locations are right here!', result.locations);
    userLocations = result.locations;
  }).then((result) => createMarkers(result.locations))

});

var currentLoc = {
  lng: 0,
  lat: 0,
  location_name: ''
}

var locationName;

mapboxgl.accessToken = 'pk.eyJ1IjoiY2xvdWR2dSIsImEiOiJjamIyZ3hzeWUxaGtlMnduMnF3Mm56eTI0In0.f-dt5_iZmOhTgDB9MOrU0Q';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/cloudvu/cjb2izk4r5btc2so0mhhejjqa',
  center: [-105.2838747, 40.0165447],
  // pitch: 60,
  zoom: 9,
  // bearing: -17.6
});



map.on('load', function() {
  map.dragPan.enable();
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

function removePopUps() {
  var popUps = document.getElementsByClassName('mapboxgl-popup');
  if (popUps[0]) popUps[0].remove();
  $('.location-info').css('display', 'none');
};

var geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken
});
map.addControl(geocoder);

map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: false
}));


map.on('click', function(e) {
  removePopUps();
  let loc = e.lngLat
  currentLoc.lng = loc.lng;
  currentLoc.lat = loc.lat;
  var popup = new mapboxgl.Popup({
      closeOnClick: false
    })
    .setLngLat(currentLoc)
    .setHTML('<button class="trigger" id="trigger-a">Check Forecast</button><button class="trigger" id="trigger-b">Add to Favorites</button><button class="trigger" id="trigger-c" hidden>Submit</button><input type="text" placeholder="Location Name" id="desc" hidden></input>')
    .addTo(map);
});

$('#map').on('click', '#trigger-a', function(ev) {
  window.location = `./data.html?lat=${currentLoc.lat}&long=${currentLoc.lng}`
})

$('#map').on('click', '#trigger-b', function(ev) {
  $('#desc').attr('hidden', false);
  $('#trigger-a').remove();
  $('#trigger-b').remove();
  $('#trigger-c').css('display', 'block');
})

$('#map').on('click', '#trigger-c', function(ev) {
  currentLoc.location_name = $('#desc').val();
  $.post('/add-location', currentLoc, (success) => {
    console.log(success);
  })
  removePopUps();
  window.location = `./data.html?lat=${currentLoc.lat}&long=${currentLoc.lng}&name=${currentLoc.location_name}`
})

$('body').on('click', '.fly-here', function(ev) {
  console.log(ev.target.id);
  flyToLocation(userLocations[ev.target.id]);
  $('.location-info').css('display', 'none')
})

$('body').on('click', '#close-favs', function(ev) {
  $('.location-info').css('display', 'none'); //and probably empty
})

function flyToLocation(item) {
  var latlng = [
    parseFloat(parseFloat(item.latitude).toFixed(7)),
    parseFloat(parseFloat(item.longitude).toFixed(7))
  ]
    map.flyTo({
      center: latlng,
      zoom: 14
    });
  };

function createPopUp(item) {
  var latlng = [
    parseFloat(parseFloat(item.latitude).toFixed(7)),
    parseFloat(parseFloat(item.longitude).toFixed(7))
  ]
  removePopUps();
  var popup = new mapboxgl.Popup({ closeOnClick: false })
    .setLngLat(latlng)
    .setHTML('<h5>'+item.location_name+'</h5>' +
      '<button class="trigger" id="trigger-a">Check Forecast</button>')
    .addTo(map);
};

function createMarkers(array) {
  array.forEach(function(marker) {
    var element = document.createElement('div');
    element.classList.add('marker');
    var latlng = [
      parseFloat(parseFloat(marker.latitude).toFixed(7)),
      parseFloat(parseFloat(marker.longitude).toFixed(7))
    ]
    new mapboxgl.Marker(element)
      .setLngLat(latlng)
      .addTo(map)

    element.addEventListener('click', function(event){
      currentLoc.lng = parseFloat(parseFloat(marker.latitude).toFixed(7));
      currentLoc.lat = parseFloat(parseFloat(marker.longitude).toFixed(7));
      var activeItem = $('active');
      flyToLocation(marker);
      createPopUp(marker);
      event.stopPropagation();
      if (activeItem[0]) {
        activeItem[0].classList.remove('active');
      }
      var location = document.getElementById('location-' + userLocations.indexOf(marker));
      location.classList.add('active');
    });
  });
}

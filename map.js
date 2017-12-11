$('document').ready(function () {
    console.log('bananas');
  });

mapboxgl.accessToken =        'pk.eyJ1IjoiY2xvdWR2dSIsImEiOiJjamIyZ3hzeWUxaGtlMnduMnF3Mm56eTI0In0.f-dt5_iZmOhTgDB9MOrU0Q';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/cloudvu/cjb2izk4r5btc2so0mhhejjqa',
  center: [-105.2838747, 40.0165447],
  pitch: 60,
  zoom: 10,
  bearing: -17.6,
});
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true,
      },
    trackUserLocation: false,
  }));

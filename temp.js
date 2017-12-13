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
  $('.locations').animate({
    'top': '10%'
  }, 300).fadeIn(100);
};

function locationListHide() {
  $('.locations').animate({
    'top': '100%'
  }, 300).fadeOut(500);
};

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

$('#menu-locations').click(function(event) {
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

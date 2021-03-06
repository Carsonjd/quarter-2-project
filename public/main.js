$('document').ready(() => {
  console.log('bananas');
  })
  var userLocations;
  //started here

  var menuOpen = false;

  function menuView() {
    menuOpen = true;
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
    $('.favs-container').empty();
    $('.location-info').css('display', 'block');
    $('.location-info').animate({
      'top': '5%'
    }, 1000).fadeIn(500);
    $.get('/user-favs', (result) => {
      userLocations = result.locations;
      console.log(userLocations);
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
      $(`<div class="loc-box"><p class= "fav-loc" id="${loc.id-1}">${loc.location_name}</p></div>`).appendTo('.favs-container')
    })
  }

  $('body').on('click', '#close-favs', (ev) => {
    $('.location-info').css('display', 'none');
    $('.favs-container').empty();
  })

  $('body').on('click', '.fav-loc', (ev) => {
    currentLoc = userLocations[ev.target.id];
    currentLoc.lng = parseFloat(parseFloat(currentLoc.latitude).toFixed(7));
    currentLoc.lat = parseFloat(parseFloat(currentLoc.longitude).toFixed(7));
    window.location = `./data.html?lat=${currentLoc.lat}&long=${currentLoc.lng}`
  })

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
    window.location = `./map.html`
  });

  $('#menu-favorites').click(function(event) {
    menuHide();
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

  $('#menu-login-logout').click((event) => {
    window.location = '/index.html';
  })

  //ended here


  const darkSkyKey = '1163de32b0c568e75278023a3768f8a3';
  var timeNow = Math.round((new Date()).getTime() / 1000);
  var yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 1)
  var yest = Math.round((yesterday).getTime() / 1000);
  var getArr = []
  var dataArr = []
  function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,
      function(m, key, value) {
        vars[key] = value;
      });
    return vars;
  }
  var locName = getUrlVars()['name']
  if(locName){
    locName = locName.replace(/(%20)/g, ' ')
    locName = locName.replace(/(%27)/g, "'")
    $('.header').text(locName)
  }
  let lat = parseFloat(parseFloat(getUrlVars()['lat']).toFixed(7))
  let long = parseFloat(parseFloat(getUrlVars()['long']).toFixed(7))
  let future = axios.get(`https://dark-star-proxy.herokuapp.com/forecast/${darkSkyKey}/${lat},${long}`).then((result) => {
    getArr.push(...(result.data.hourly.data))
  }).then(() => {
    axios.get(`https://dark-star-proxy.herokuapp.com/forecast/${darkSkyKey}/${lat},${long},${yest}`).then((res) => {
      getArr.push(...(res.data.hourly.data))
    })
  })

  Promise.all([future])
    .then((res) => {
      var i = 0
      let filteredArr = [ ...new Set(getArr)]
      filteredArr.map((el) => {
        let tConv = new Date(el.time * 1000)
        let hour = {
          time: tConv,
          appTemp: el.apparentTemperature,
          cloudCover: (el.cloudCover * 100),
          dewPoint: el.dewPoint,
          humidity: (el.humidity * 100),
          windSpeed: el.windSpeed,
          precipProbability: (el.precipProbability * 100)
        }
        dataArr.push(hour)
        i++
      })
      var formatTime = d3.timeFormat("%m/%d/%y %H:%m:%S %p");
      var parseTime = d3.timeParse("%m/%d/%y %H:%m:%S %p");
      var datearray = []
      var colorrange = ['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854','#ffd92f','#e5c494']
      //var colorrange = ["#B6207F", "#B62034", "#B65720", "#B6A220", "#7FB620", "#34B620"];
      //var olorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
      //var colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
      //var colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
      strokecolor = '#000000';

      var stack = d3.stack()
        .keys(["appTemp", "cloudCover", "dewPoint", "humidity", "windSpeed", "precipProbability"])
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetWiggle);
      var series = stack(dataArr);

      var margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 70
      }

      var width = document.body.clientWidth;
      var height = 700 - margin.top - margin.bottom;

      var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

      var tooltip = d3.select("body")
        .append("div")
        .attr("class", "remove")
        .attr("class", "tip")
        .style("position", "absolute")
        .style("z-index", "20")
        .style("visibility", "hidden")
        .style("top", "30px")
        .style("left", "60px");

      var x = d3.scaleTime()
        .domain(d3.extent(dataArr, function(d) {
          return d.time;
        }))
        .range([0, width]);

      var valueline = d3.line()
        .x(function(d) {
          return x(d.time);
        })

      //setup axis
      var xAxis = d3.axisBottom(x);

      var y = d3.scaleLinear()
        .domain([0, d3.max(series, function(layer) {
          return d3.max(layer, function(d) {
            return d[0] + d[1];
          });
        })])
        .range([height, 0]);

      var color = d3.scaleOrdinal()
        .range(colorrange);

      var area = d3.area()
        .x(function(d) {
          return x(d.data.time);
        })
        .y0(function(d) {
          return y(d[0]);
        })
        .y1(function(d) {
          return y(d[1]);
        })
        .curve(d3.curveBasis);

      svg.selectAll("path")
        .data(series)
        .enter().append("path")
        .attr("class", "layer")
        .attr("d", area)
        .attr("transform", "translate(10, -200)")
        .style("fill", function(d, i) {
          return color(i);
        });

      svg.append("g")
        .attr("class", "axis")
        .style("fill", "black")
        .attr("transform", "translate(10,520)")
        .call(d3.axisBottom(x)
          .tickFormat(d3.timeFormat("%m/%d/%y %H:%m:%S %p")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-90)");

      // text label for the x axis
      svg.append("text")
        .style("fill", "black")
        .attr("transform",
          "translate(" + (width / 2) + " ," +
          (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Date");

      // Add the y Axis
      svg.append("g")
        .attr("class", "y-axis")
        .style("fill", "black")
        .attr("transform", "translate(10, 10)")
        .call(d3.axisLeft(y))

      // text label for the y axis
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text(".");

      function transition() {
        var t;
        d3.selectAll("path")
          .data((t = layers1, layers1 = layers0, layers0 = t))
          .transition()
          .duration(2500)
          .attr("d", area);
      }
      ///////////////////////////////// create legend /////////////////////////////////////////
      //["appTemp", "cloudCover", "dewPoint", "humidity", "windSpeed"]
      function legend(series) {
        $('.chart').prepend('<div class="legend"><div class="title">Data Type</div></div>');
        $('.legend').hide();
        var legend = []
        series.forEach(function(d, i=0) {
          var obj = {}
          if(d.key === "appTemp"){
            obj.key = "Apparent Temp."
          }
          if(d.key === "cloudCover"){
            obj.key = "Cloud Cover"
          }
          if(d.key === "dewPoint"){
            obj.key = "Dew Point"
          }
          if(d.key === "humidity"){
            obj.key = "Humidity"
          }
          if(d.key === "windSpeed"){
            obj.key = "Wind Speed"
          }
          if(d.key === "precipProbability"){
            obj.key = "Precip. Prob."
          }
          obj.color = colorrange[i];
          legend.push(obj);
          i++
        });
        legend.forEach(function(d, i) {
          $('.legend').append('<div class="item" style="background: ' + d.color + '">' + d.key + '</div>');
        });
        $('.legend').fadeIn();
      }
      legend(series)
      ////////////////////////// end legend function //////////////////////////////////
      let type = (d) => {
        if(d.key === "appTemp"){
           return "Appar. Temp."
        }
        if(d.key === "cloudCover"){
           return "Cloud Cover"
        }
        if(d.key === "dewPoint"){
           return "Dew Point"
        }
        if(d.key === "humidity"){
           return "Humidity"
        }
        if(d.key === "windSpeed"){
           return "Wind Speed"
        }
        if(d.key === "precipProbability"){
          return "Precip. Prob."
        }
      }

      let unit = (d) => {
        if(d.key === "appTemp"){
           return "˚F"
        }
        if(d.key === "cloudCover"){
           return "%"
        }
        if(d.key === "dewPoint"){
           return "˚F"
        }
        if(d.key === "humidity"){
           return "%"
        }
        if(d.key === "windSpeed"){
           return "mph"
        }
        if(d.key === "precipProbability"){
          return "%"
        }
      }

      svg.selectAll(".layer")
        .attr("opacity", 1)
        .on("mouseover", function(d, i) {
          svg.selectAll(".layer").transition()
            .duration(250)
            .attr("opacity", function(d, j) {
              return j != i ? 0.5 : 1;
            })
        })

        .on("mousemove", function(d, i) {
          mousex = d3.mouse(this);
          mousex = mousex[0];
          mousey = d3.mouse(this);
          mousey = mousey[1];
          var invertedx = x.invert(mousex);
          var stringTime = (invertedx+'').slice(0,25)
          var invDate = `${invertedx.getDate()} ${invertedx.getHours()}`
          var selected = d.key;
          var pro = dataArr.filter((el) => {
            var elDate = `${el.time.getDate()} ${el.time.getHours()}`
            return elDate === invDate
          })[0][selected]
          var color = d3.select(this).style('fill'); // need to know the color in order to generate the swatch
          d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"),
            tooltip
              .style("left", (mousex -50) + "px")
              .style("top", (mousey -300) + "px")
              .html("<div class='time'>" + stringTime + "</div><div class='key'><div style='background:" + color + "'     class='swatch'>&nbsp;</div>" + type(d) + "</div><div class='value'>" + pro.toFixed(2) + unit(d) + "</div>")
              .style("visibility", "visible");
        })

        .on("mouseout", function(d, i) {
          svg.selectAll(".layer")
            .transition()
            .duration(250)
            .attr("opacity", "1");
          d3.select(this)
            .classed("hover", false)
            .attr("stroke-width", "0px"), tooltip.html("<p>" + d.key + "<br>" + pro + "</p>").style("visibility", "hidden");
        })

      var vertical = d3.select(".chart")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "19")
        .style("width", "2px")
        .style("height", "900px")
        .style("top", "70px")
        .style("bottom", "30px")
        .style("left", "0px")
        .style("background", "#fff");

      d3.select(".chart")
        .on("mousemove", function() {
          mousex = d3.mouse(this);
          mousex = mousex[0] + 5;
          vertical.style("left", mousex + "px")
        })
        .on("mouseover", function() {
          mousex = d3.mouse(this);
          mousex = mousex[0] + 5;
          vertical.style("left", mousex + "px")
        });


    })






// apparentTemperature
// :
// -0.22
// cloudCover
// :
// 0.23
// dewPoint
// :
// -4.49
// humidity
// :
// 0.47
// icon
// :
// "clear-night"
// ozone
// :
// 300.82
// precipAccumulation
// :
// 0.006
// precipIntensity
// :
// 0.0003
// precipProbability
// :
// 0.03
// precipType
// :
// "snow"
// pressure
// :
// 1036.47
// summary
// :
// "Clear"
// temperature
// :
// 11.58
// time
// :
// 1512910800
// uvIndex
// :
// 0
// visibility
// :
// 10
// windBearing
// :
// 272
// windGust
// :
// 11.45
// windSpeed
// :
// 8.24

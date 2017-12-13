$('document').ready(() => {
  console.log('bananas');

  const darkSkyKey = '1163de32b0c568e75278023a3768f8a3';
  var timeNow = Math.round((new Date()).getTime() / 1000);
  var yesterday = new Date()
            yesterday.setDate(yesterday.getDate() - 0.5)
  var yest = Math.round((yesterday).getTime() / 1000);
  console.log(yest);
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
    $('.header').text(locName)
  }
  let lat = getUrlVars()['lat']
  let long = getUrlVars()['long']
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
      console.log(filteredArr);
      filteredArr.map((el) => {
        let tConv = new Date(el.time * 1000)
        let hour = {
          time: tConv,
          appTemp: el.apparentTemperature,
          cloudCover: el.cloudCover,
          dewPoint: el.dewPoint,
          humidity: el.humidity,
          windSpeed: el.windSpeed
        }
        dataArr.push(hour)
        i++
      })
      console.log(dataArr);
      var formatTime = d3.timeFormat("%m/%d/%y %H:%m:%S %p");
      var parseTime = d3.timeParse("%m/%d/%y %H:%m:%S %p");
      var datearray = []
      var colorrange = ['#66c2a5','#fc8d62','#8da0cb','#e78ac3','#a6d854','#ffd92f','#e5c494']
      //var colorrange = ["#B6207F", "#B62034", "#B65720", "#B6A220", "#7FB620", "#34B620"];
      //var olorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
      //var colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
      //var colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
      strokecolor = colorrange[0];

      // // function to ensure the tip doesn't hang off the side
      // function tipX(x) {
      //   var winWidth = $(window).width();
      //   var tipWidth = $('.tip').width();
      //   if (breakpoint == 'xs') {
      //     x > winWidth - tipWidth - 20 ? y = x - tipWidth : y = x;
      //   } else {
      //     x > winWidth - tipWidth - 30 ? y = x - 45 - tipWidth : y = x + 10;
      //   }
      //   return y;
      // }

      var stack = d3.stack()
        .keys(["appTemp", "cloudCover", "dewPoint", "humidity", "windSpeed"])
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetWiggle);
      var series = stack(dataArr);

      var margin = {
        top: 20,
        right: 20,
        bottom: 50,
        left: 70
      }
      var width = document.body.clientWidth - margin.left - margin.right;
      var height = 900 - margin.top - margin.bottom;

      var svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

      var tooltip = d3.select("body")
        .append("div")
        .attr("class", "remove")
        .style("position", "absolute")
        .style("z-index", "20")
        .style("visibility", "hidden")
        .style("top", "30px")
        .style("left", "55px");

      var x = d3.scaleTime()
        .domain(d3.extent(dataArr, function(d) {
          return d.time;
        }))
        .range([0, width]);

      var valueline = d3.line()
        .x(function(d) {
          return x(d.time);
        })
      //.y(function(d) { return y(d.close); });

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
        .attr("transform", "translate(30, -200)")
        .style("fill", function(d, i) {
          return color(i);
        });

      svg.append("g")
        .attr("class", "axis")
        .style("fill", "black")
        .attr("transform", "translate(0,600)")
        .call(d3.axisBottom(x)
          .tickFormat(d3.timeFormat("%m/%d/%y %H:%m:%S %p")))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

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
        .attr("class", "axis")
        .style("fill", "black")
        .attr("transform", "translate(30, 0)")
        .call(d3.axisLeft(y));

      // text label for the y axis
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Value");

      function transition() {
        var t;
        d3.selectAll("path")
          .data((t = layers1, layers1 = layers0, layers0 = t))
          .transition()
          .duration(2500)
          .attr("d", area);
      }
      ///////////////////////////////// create legend /////////////////////////////////////////
      function legend(series) {
        $('.chart').prepend('<div class="legend"><div class="title">Data Type</div></div>');
        $('.legend').hide();
        var legend = []
        series.forEach(function(d, i=0) {
          var obj = {}
          obj.key = d.key;
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
          var invertedx = x.invert(mousex);
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
              .style("left", mousex + "px")
              .style("top", "100px")
              .html("<div class='time'>" + invertedx + "</div><div class='key'><div style='background:" + color + "'     class='swatch'>&nbsp;</div>" + d.key + "</div><div class='value'>" + pro + "</div>")
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
        .style("width", "1px")
        .style("height", "900px")
        .style("top", "10px")
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

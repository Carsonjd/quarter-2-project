
$('document').ready(() => {
  console.log('bananas');

  const darkSkyKey = '1163de32b0c568e75278023a3768f8a3';
  var dataArr = []
  let queryParams = window.location.search.split("?lat=")[1].split("&long=")
  let lat = queryParams[0]
  let long = queryParams[1]
  axios.get(`https://dark-star-proxy.herokuapp.com/forecast/${darkSkyKey}/${lat},${long}`)
    .then((res) => {
      var i = 0
      res.data.hourly.data.map((el) => {
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
      var formatTime = d3.timeFormat("%m/%d/%y %H:%m:%S %p");
      var parseTime = d3.timeParse("%m/%d/%y %H:%m:%S %p");
      var datearray = []
      colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
      //colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
      //colorrange = ["#B30000", "#E34A33", "#FC8D59", "#FDBB84", "#FDD49E", "#FEF0D9"];
      strokecolor = colorrange[0];

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

      var color = d3.scaleLinear()
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
//////////////////////////////////////////////////////////////////////////
      // function legend(layers) {
      //
      //   // generate the legend title
      //   function titler(filter, group) {
      //
      //     if (group == 'place') {
      //       if (filter == 'india') {
      //         return "State";
      //       } else {
      //         return "Country";
      //       }
      //     }
      //
      //   }
      //
      //   $('.chart.' + groupBy + '.' + filterBy).prepend('<div class="legend"><div class="title">' + titler(filterBy, groupBy) + '</div></div>');
      //   $('.legend').hide();
      //   var legend = []
      //   layers.forEach(function(d, i) {
      //     var obj = {};
      //     if (i < 7) {
      //       obj.key = d.key;
      //       obj.color = colorrange[i];
      //       legend.push(obj);
      //     }
      //   });
      //
      //   // others
      //   if (layers.length > 7) {
      //     legend.push({
      //       key: "Other",
      //       color: "#b3b3b3"
      //     });
      //   }
      //
      //   legend.forEach(function(d, i) {
      //     $('.chart.' + groupBy + '.' + filterBy + ' .legend').append('<div class="item"><div class="swatch" style="background: ' + d.color + '"></div>' + d.key + '</div>');
      //   });
      //
      //   $('.legend').fadeIn();
      //
      // } // end legend function

      ////////////////////////////////////////////////////////////
      svg.selectAll(".layer")
        .attr("opacity", 1)
        .on("mouseover", function(d, i) {
          svg.selectAll(".layer").transition()
            .duration(250)
            .attr("opacity", function(d, j) {
              return j != i ? 0.6 : 1;
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

          d3.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"),
            tooltip.html("<p>" + d.key + "<br>" + pro + "</p>").style("visibility", "visible");

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

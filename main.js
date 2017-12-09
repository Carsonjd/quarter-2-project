$('document').ready(() => {
  console.log('bananas');
  })
  const darkSkyKey = '1163de32b0c568e75278023a3768f8a3';
  var dataHold = []
  let lat = 40.2549
  let long = -105.6160
  axios.get(`https://dark-star-proxy.herokuapp.com/forecast/${darkSkyKey}/${lat},${long}`)
    .then((res) => {
      // for (let each in res.data.hourly.data){
        // let hour = {
        // appTemp: each.apparentTemperature,
        // cloudCover: each.cloudCover,
        // dewPoint: each.dewPoint,
        // humidity: each.humidity,
        // windSpeed: each.windSpeed
        // }
        dataHold.push(res.data.hourly.data.map((el) => el.windSpeed))
        dataHold.push(res.data.hourly.data.map((el) => el.windGust))

        var n = 2, // number of layers
            m = 49, // number of samples per layer
            k = 10; // number of bumps per layer
        console.log(dataHold);
        var stack = d3.stack().keys(d3.range(n)).offset(d3.stackOffsetWiggle),
            layers0 = stack(d3.transpose(d3.range(n).map(function() { return dataHold[0] }))),
            layers1 = stack(d3.transpose(d3.range(n).map(function() { return dataHold[0] })))
            layers = layers0.concat(layers1);

        var svg = d3.select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var x = d3.scaleLinear()
            .domain([0, m - 1])
            .range([0, width]);

        var y = d3.scaleLinear()
            .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
            .range([height, 0]);

        var z = d3.interpolateCool;

        var area = d3.area()
            .x(function(d, i) { return x(i); })
            .y0(function(d) { return y(d[0]); })
            .y1(function(d) { return y(d[1]); });

        svg.selectAll("path")
          .data(layers0)
          .enter().append("path")
            .attr("d", area)
            .attr("fill", function() { return z(Math.random()); });

        function stackMax(layer) {
          return d3.max(layer, function(d) { return d[1]; });
        }

        function stackMin(layer) {
          return d3.min(layer, function(d) { return d[0]; });
        }

        function transition() {
          var t;
          d3.selectAll("path")
            .data((t = layers1, layers1 = layers0, layers0 = t))
            .transition()
              .duration(2500)
              .attr("d", area);
        }

        // Inspired by Lee Byron’s test data generator.
        function bumps(n, m) {
          var a = [], i;
          for (i = 0; i < n; ++i) a[i] = 0;
          for (i = 0; i < m; ++i) bump(a, n);
          return a;
        }

        function bump(a, n) {
          var x = 1 / (0.1 + Math.random()),
              y = 2 * Math.random() - 0.5,
              z = 10 / (0.1 + Math.random());
          for (var i = 0; i < n; i++) {
            var w = (i / n - y) * z;
            a[i] += x * Math.exp(-w * w);
          }
        }

    })


apparentTemperature
:
-0.22
cloudCover
:
0.23
dewPoint
:
-4.49
humidity
:
0.47
icon
:
"clear-night"
ozone
:
300.82
precipAccumulation
:
0.006
precipIntensity
:
0.0003
precipProbability
:
0.03
precipType
:
"snow"
pressure
:
1036.47
summary
:
"Clear"
temperature
:
11.58
time
:
1512910800
uvIndex
:
0
visibility
:
10
windBearing
:
272
windGust
:
11.45
windSpeed
:
8.24
//D3 Vis//////////////////////////////////////////////////////////////

// var n = 5, // number of layers
//     m = 200, // number of samples per layer
//     k = 10; // number of bumps per layer
// console.log(dataHold);
//
// var stack = d3.stack().keys(d3.range(n)).offset(d3.stackOffsetWiggle),
//     layers0 = stack(d3.transpose(dataHold)),
//     layers1 = stack(d3.transpose(dataHold)),
//     layers = layers0.concat(layers1);
//
// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height");
//
// var x = d3.scaleLinear()
//     .domain([0, m - 1])
//     .range([0, width]);
//
// var y = d3.scaleLinear()
//     .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
//     .range([height, 0]);
//
// var z = d3.interpolateCool;
//
// var area = d3.area()
//     .x(function(d, i) { return x(i); })
//     .y0(function(d) { return y(d[0]); })
//     .y1(function(d) { return y(d[1]); });
//
// svg.selectAll("path")
//   .data(layers0)
//   .enter().append("path")
//     .attr("d", area)
//     .attr("fill", function() { return z(Math.random()); });
//
// function stackMax(layer) {
//   return d3.max(layer, function(d) { return d[1]; });
// }
//
// function stackMin(layer) {
//   return d3.min(layer, function(d) { return d[0]; });
// }
//
// function transition() {
//   var t;
//   d3.selectAll("path")
//     .data((t = layers1, layers1 = layers0, layers0 = t))
//     .transition()
//       .duration(2500)
//       .attr("d", area);
// }
//
// // Inspired by Lee Byron’s test data generator.
// function bumps(n, m) {
//   var a = [], i;
//   for (i = 0; i < n; ++i) a[i] = 0;
//   for (i = 0; i < m; ++i) bump(a, n);
//   return a;
// }
//
// function bump(a, n) {
//   var x = 1 / (0.1 + Math.random()),
//       y = 2 * Math.random() - 0.5,
//       z = 10 / (0.1 + Math.random());
//   for (var i = 0; i < n; i++) {
//     var w = (i / n - y) * z;
//     a[i] += x * Math.exp(-w * w);
//   }
// }

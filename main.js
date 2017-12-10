$('document').ready(() => {
  console.log('bananas');


  const darkSkyKey = '1163de32b0c568e75278023a3768f8a3';
  var data = []
  let lat = 40.2549
  let long = -105.6160
  axios.get(`https://dark-star-proxy.herokuapp.com/forecast/${darkSkyKey}/${lat},${long}`)
    .then((res) => {
      let i=0
      res.data.hourly.data.map((el) => {
        let hour = {
          time: i,
          appTemp: el.apparentTemperature,
          cloudCover: el.cloudCover,
          dewPoint: el.dewPoint,
          humidity: el.humidity,
          windSpeed: el.windSpeed
        }
        data.push(hour)
        i++
      })

      var stack = d3.stack()
    .keys(["time", "appTemp", "cloudCover", "dewPoint", "humidity", "windSpeed"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetWiggle);

var series = stack(data);
console.log(series);
var width = 1000,
    height = 800;

var x = d3.scaleTime()
    .domain(d3.extent(data, function(d){ return d.time; }))
    .range([0, width]);

// setup axis
var xAxis = d3.axisBottom(x);

var y = d3.scaleLinear()
    .domain([0, d3.max(series, function(layer) { return d3.max(layer, function(d){ return d[0] + d[1];}); })])
    .range([height, 0]);

var color = d3.scaleLinear()
    .range(["#51D0D7", "#31B5BB"]);

var area = d3.area()
    .x(function(d) { console.info('in area function', d); return x(d.data.time); })
    .y0(function(d) { return y(d[0]); })
    .y1(function(d) { return y(d[1]); })
    .curve(d3.curveBasis);

var svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

svg.selectAll("path")
    .data(series)
    .enter().append("path")
    .attr("d", area)
    .style("fill", function() { return color(Math.random()); });

svg.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + (height) + ")")
            .call(xAxis);
//       var n = 5, // number of layers
//         m = 49, // number of samples per layer
//         k = 13; // number of bumps per layer
//
//       var stack = d3.stack().keys(d3.range(n)).offset(d3.stackOffsetWiggle),
//         layers0 = stack(d3.transpose(d3.range(n).map(function() {
//           return dataHold[0];
//         }))),
//         layers1 = stack(d3.transpose(d3.range(n).map(function() {
//           return dataHold[0];
//         }))),
//         layers = layers0.concat(layers1);
//
//       var svg = d3.select("svg"),
//         width = +svg.attr("width"),
//         height = +svg.attr("height");
//
//       var x = d3.scaleLinear()
//         .domain([0, m - 1])
//         .range([0, width]);
//
//       var y = d3.scaleLinear()
//         .domain([d3.min(layers, stackMin), d3.max(layers, stackMax)])
//         .range([height, 0]);
//
//       var z = d3.interpolateCool;
//
//       var area = d3.area()
//         .x(function(d, i) {
//           return x(i);
//         })
//         .y0(function(d) {
//           return y(d[0]);
//         })
//         .y1(function(d) {
//           return y(d[1]);
//         });
//
//       svg.selectAll("path")
//         .data(layers0)
//         .enter().append("path")
//         .attr("d", area)
//         .attr("fill", function() {
//           return z(Math.random());
//         });
//
//       function stackMax(layer) {
//         return d3.max(layer, function(d) {
//           return d[1];
//         });
//       }
//
//       function stackMin(layer) {
//         return d3.min(layer, function(d) {
//           return d[0];
//         });
//       }
//
//       function transition() {
//         var t;
//         d3.selectAll("path")
//           .data((t = layers1, layers1 = layers0, layers0 = t))
//           .transition()
//           .duration(2500)
//           .attr("d", area);
//       }
//
//       // Inspired by Lee Byron’s test data generator.
//       function bumps(n, m) {
//         var a = [],
//           i;
//         for (i = 0; i < n; ++i) a[i] = 0;
//         for (i = 0; i < m; ++i) bump(a, n);
//         return a;
//       }
//
//       function bump(a, n) {
//         var x = 1 / (0.1 + Math.random()),
//           y = 2 * Math.random() - 0.5,
//           z = 10 / (0.1 + Math.random());
//         for (var i = 0; i < n; i++) {
//           var w = (i / n - y) * z;
//           a[i] += x * Math.exp(-w * w);
//         }
//       }
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

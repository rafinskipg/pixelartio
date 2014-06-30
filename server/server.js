var express = require('express');
var image_generator = require('./generate_canvas_image')
var heatmapjs = require('./heatmap')
var app = express();

var bodyParser = require('body-parser')

app.use( bodyParser.json({limit: '50mb'}) );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() );

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.post('/gen-image', function(req, res){
  var url = image_generator.generate(req);
  res.json({url: url});
});
app.post('/gen-heat-map', function(req, res){
  var url = image_generator.generate_heatMap(req);
  res.json({url: url});
});
app.post('/gen-heat-map-npm', function(req, res){
  var url = heatmapjs.generate_heatMap(req);
  res.json({url: url});
});

app.listen(3000);
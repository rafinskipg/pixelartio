var express = require('express');
var image_generator = require('./generate_canvas_image')
var app = express();

app.post('/gen-image', function(req, res){
  var url = image_generator.generate(req);
  res.json({url: url});
});

app.listen(3000);
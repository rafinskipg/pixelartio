var Canvas = require('canvas')
  , Image = Canvas.Image;

function generate(req){
  var canvas = new Canvas(300,300)
  var ctx = canvas.getContext('2d');
  var points = req.body.points;

  points.map(function(point){
    ctx.fillStyle = point.color;
    ctx.fillRect(point.x, point.y, point.width, point.height);
  });
  return canvas.toDataURL();
}

module.exports = {
  generate : generate
}
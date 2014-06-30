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

function generate_heatMap(req){
  var canvas = new Canvas(300,300)
  var ctx = canvas.getContext('2d');
  var points = req.body.points;
  
  //That makes the poinst sum its colours
  ctx.globalCompositeOperation = 'lighter';

  ctx.globalAlpha = 0.5;

  points.map(function(point){
    ctx.fillStyle = point.color;
    //ctx.fillRect(point.x, point.y, point.width, point.height);
    ligthenGradient(ctx, point.x, point.y, point.width * 2 );
  });
  return canvas.toDataURL();
}

function ligthenGradient(ctx, x, y, radius) {
  ctx.save();
  ctx.globalAlpha = 0.5;
  ctx.globalCompositeOperation = 'lighter';
  var radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
  radialGradient.addColorStop(0.0, 'rgba(255, 0, 0, 0.26)');
  radialGradient.addColorStop(0.2 , 'rgba(244, 253, 32, 0.26)');
  radialGradient.addColorStop(0.7 , 'rgba(85, 253, 32, 0.26)');
  radialGradient.addColorStop(0.90, 'rgba(0, 41, 255, 0.26)');
  radialGradient.addColorStop(1, 'rgba(255, 255, 255, 0.26)');
  ctx.fillStyle = radialGradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
  ctx.restore();
}

module.exports = {
  generate : generate,
  generate_heatMap: generate_heatMap
}
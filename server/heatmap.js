var heatmap = require('heatmap');

function generate_heatMap(req){
  var heat = heatmap(300, 300, { radius : 10 });
  var points = req.body.points;
  for (var i = 0; i < 5000; i++) {
     var x = parseInt(Math.random() * 300);
     var y = parseInt(Math.random() * 300);

      heat.addPoint(x, y);
  }
  heat.draw();

  points.map(function(point){
    heat.addPoint(point.x, point.y);;
  });

  heat.draw()
  return heat.canvas.toDataURL();
}


module.exports = {
  generate_heatMap: generate_heatMap
}
"use strict";

function Layer(name, opts){
  this.name = name;
  this.type = opts.type;
  this.points = [];
  this.updated = true;
  this.scaleFactor = 2.0;
  this.size = {
    x: opts.x,
    y: opts.y
  }
  this.center = {
    x: parseInt(opts.x/2),
    y: parseInt(opts.y/2)
  }
  this.visible = true;
  this.scale = 1.0;

  for(var i = 0; i < this.size.x; i++){
    this.points.push([]);
    for(var j = 0; j < this.size.y; j++){
      this.points[i].push([]);
    }
  }

  if(this.type == 'baseLayer'){
    for(var i = 0; i < this.points.length; i++){
      for(var j = 0; j <  this.points[i].length; j++){
        var color = 'rgb(185, 182, 182)';
        if(isPair(j+i)){
          color = 'grey';
        }
        this.points[i][j] = new Point({x : i, y: j, color: color});
      }
    }
  }
}


function isPair(number){
  return number %2 === 0;
}

Layer.prototype.setSize = function(x,y){
  this.size.x  = x;
  this.size.y = y;
}


Layer.prototype.addPoint = function(x,y, color){
  this.points[x][y] = new Point({
    x: x,
    y: y,
    color: color
  });

  this.updated = true;
}


Layer.prototype.hide = function(){
  this.visible = false;
}

Layer.prototype.show = function(){
  this.visible = true;
}

Layer.prototype.render = function(index){
  var c = this.getCanvas(index);
  var ctx = c.getContext("2d");
 
  if(this.visible){
    ctx.save();
    //ctx.scale(this.scale, this.scale)
    var points = this.getRenderingPoints();
    for(var i = 0; i < points.length; i++){
      ctx.fillStyle = points[i].color;
      ctx.fillRect(points[i].x , points[i].y,  points[i].width,  points[i].height);  
    }
    ctx.restore();
    this.updated = false;
  }else{
    c.width = c.width;
    this.udpated = false;
  }
}

Layer.prototype.getRenderingPoints = function() {
  var pointSize = this.getPointSize();
    
  //Max points to show
  var maxRow = this.initialRow + this.max_total_rows_left * 2;
  var maxPoint = this.initialPoint + this.max_total_rows_top * 2;
  maxRow = maxRow > this.size.x ? this.size.x : maxRow;
  maxPoint = maxPoint > this.size.y ? this.size.y : maxPoint;

  //Offset to substract to the point rendering
  var offsetLeft = this.initialRow * pointSize;
  var offsetTop = this.initialPoint * pointSize;

  var points = [];

  for(var i = this.initialRow; i < maxRow; i ++){
    for(var j = this.initialPoint;  j < maxPoint; j++){
      var options = {
        x : this.points[i][j].x * pointSize - offsetLeft,
        y : this.points[i][j].y * pointSize  - offsetTop,
        color : this.points[i][j].color,
        width: pointSize,
        height: pointSize
      };
      if(options.x && options.y){
        points.push(options);
      }
    }
  }

  return points;
};

Layer.prototype.getPointSize = function(){
  return this.scale * 1;
}

Layer.prototype.setZoom = function(opts, index){
  this.scale = opts.scale;
  this.center.x = opts.centerAt.x;
  this.center.y = opts.centerAt.y;
  this.calculateMaxShowingPoints(index);
  this.calculateInitialPoints();
}

Layer.prototype.calculateInitialPoints = function(){
  //Calculate initial points to show, due to the zoomed area
  var initialRow = this.center.x - this.max_total_rows_left;
  var initialPoint = this.center.y - this.max_total_rows_top;
  this.initialRow = initialRow < 0 ? 0 : initialRow;
  this.initialPoint = initialPoint < 0 ? 0 : initialPoint;
}

Layer.prototype.calculateMaxShowingPoints = function(index) {
  //Returns the points frm the center that can be shown at this time

  var pointSize = this.getPointSize();
  var rowsLeft = 1;
  var rowsTop = 1;
  var isInsideLeft = true;
  var isInsideTop = true;
  var midCanvasWidth = parseInt(this.getCanvas(index).width / 2);
  var midCanvasHeight = parseInt(this.getCanvas(index).height / 2);
  
  while(isInsideLeft){
    var width = rowsLeft * pointSize ; 
    if(width < midCanvasWidth){
      rowsLeft ++;
    }else{
      isInsideLeft = false;
    }
  }

  while(isInsideTop){
    var width = rowsTop * pointSize; 
    if(width < midCanvasHeight){
      rowsTop ++;
    }else{
      isInsideTop = false;
    }
  }


  this.max_total_rows_left = rowsLeft;
  this.max_total_rows_top = rowsTop;
};

Layer.prototype.needsRendering = function(){
  return this.updated;
}

Layer.prototype.paint = function(e, color, index){
  var c = this.getCanvas(index);
  var coords = c.relMouseCoords(e);
 
  //var factor = this.scale;
  var factor = 1.0;
  var indexes = this.translateCoordinatesToIndexes(coords.x,coords.y, factor);
  this.addPoint(indexes.x,indexes.y,color);
}

Layer.prototype.translateCoordinatesToIndexes = function(x,y, factor) {
  var num_x = parseInt((x/factor) / this.getPointSize());
  var num_y = parseInt((y/factor) / this.getPointSize());

  return {
    x: num_x + this.initialRow,
    y: num_y + this.initialPoint
  }
};


Layer.prototype.getCanvas = function(index){
  return document.getElementById('canvasLayer_' + index);
}
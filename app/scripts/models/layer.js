"use strict";

function Layer(opts){
  this.type = opts.type;
  this.points = [];
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
        var color = 'black';
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
  if(this.visible){
    var c = document.getElementById("canvasLayer_"+ index);
    var ctx = c.getContext("2d");
    var pointSize = this.getPointSize();
    var self = this;
    this.points.map(function(row){
      row.map(function(point){
        ctx.fillStyle = point.color;
        ctx.fillRect(point.x * pointSize, point.y * pointSize, pointSize, pointSize);  
      })
    });
    this.updated = false;
  }
}

Layer.prototype.getPointSize = function(){
  return this.scale * 1;
}

Layer.prototype.setZoom = function(opts){
  this.scale = opts.scale;
  this.center.x = opts.centerAt.x;
  this.center.y = opts.centerAt.y;
}

Layer.prototype.needsRendering = function(){
  return this.updated;
}
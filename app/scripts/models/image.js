function ImagePixel(base_width, base_height){
  this.base_height = base_height; 
  this.base_width = base_width;
  this.layers = [];
  this.layers.push(new Layer('Background', { type : 'baseLayer', x : base_width, y: base_height }));
  this.layers.push(new Layer('Default_1', { type : 'transparent', x : base_width, y: base_height }));
}

ImagePixel.prototype.addLayer = function(type){
  type = type ? type : 'transparent';
  this.layers.push(new Layer('Default_'+this.layers.length, { type : type, x : this.base_width, y: this.base_height }));
}

ImagePixel.prototype.deleteLayer = function(layer){
  this.layers.splice(this.layers.indexOf(layer), 1);
}
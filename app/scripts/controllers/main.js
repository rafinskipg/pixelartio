'use strict';

angular.module('pixelartioApp')
  .controller('MainCtrl',[ '$scope', 'rafSrv', 'settingsSrv','imageGenerationSrv', function ($scope, rafSrv, settingsSrv, imageGenerationSrv) {
    $scope.layers = [];

    var base_width = 300;
    var base_height = 300;
    var visible_width = 500;
    var visible_height = 500;
    var center_x = 150;
    var center_y = 150;
    var zoom = 5.0;

    function init(){
      $scope.image = new ImagePixel(base_width, base_height);
      $scope.currentLayer = $scope.image.layers[0];
      rafSrv.suscribe(renderLayers, 'mainRenderLayers');
    }

    angular.element(document).ready(function(){
      rafSrv.start();
    });

    $scope.hideLayer = function(layer){
      layer.hide();
      layer.updated = true;
    }

    $scope.showLayer = function(layer){
      layer.show();
      layer.updated = true;
    }

    function renderLayers(){
      $scope.image.layers.map(function(layer,index){
        layer.setZoom(getCurrentZoom(),index);
        if(layer.needsRendering()){
          layer.render(index);    
        }
      })
    }

    $scope.addLayer = function(){
      $scope.image.addLayer();
    }

    $scope.setCurrentLayer = function(layer){
      $scope.currentLayer = layer;
    }

    $scope.deleteLayer = function(layer){
      $scope.image.deleteLayer(layer);
      $scope.currentLayer = $scope.image.layers[0];
    }

    $scope.moveUp = function(){
      center_y++;
    }

    $scope.moveDown = function(){
      center_y--;
    }

    $scope.moveLeft = function(){
      center_x--;
    }

    $scope.moveRight = function(){
      center_x++;
    }

    $scope.zoomIn = function(){
      zoom+=1.5;
    }

    $scope.zoomOut = function(){
      zoom+=1.5;
    }

    $scope.paint = function(layer, event, index){
      layer.paint(event, settingsSrv.getCurrentColor(), index);
    }

    function getPoints(){
      var points = [];

      $scope.image.layers.map(function(layer,index){
        layer.setZoom(getCurrentZoom(),index);
        if(layer.visible ){
          var layerPoints = layer.getRenderingPoints();    
          points = points.concat(layerPoints);
        }
      })
      return points;
    }

    $scope.generateImage = function(){
      var points = getPoints();

      imageGenerationSrv.generate(points)
        .then(function(response){
          $scope.imageSrc = response.data.url;
        })
        .catch(function(fail){
          console.log('eee')
        })
        
    } 

    $scope.generateHeatMap = function(){
      var points = getPoints();

      imageGenerationSrv.generateHeatMap(points)
        .then(function(response){
          $scope.imageSrc = response.data.url;
        })
        .catch(function(fail){
          console.log('eee')
        })
        
    }
    $scope.generateHeatMapNpm = function(){
      var points = getPoints();

      imageGenerationSrv.generateHeatMapNpm(points)
        .then(function(response){
          $scope.imageSrc = response.data.url;
        })
        .catch(function(fail){
          console.log('eee')
        })
        
    }

    function getCurrentZoom(){
      return {
        scale: zoom,
        centerAt: {
          x: center_x,
          y: center_y
        },
        width: visible_width,
        height: visible_height
      }
    }



    init();

  }]);

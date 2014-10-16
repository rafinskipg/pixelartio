'use strict';

angular.module('pixelartioApp')
  .controller('MainCtrl',['$timeout', '$scope', 'rafSrv', 'settingsSrv', 'imageSrv','actionsSrv', function ($timeout, $scope, rafSrv, settingsSrv, imageSrv, actionsSrv) {
    $scope.layers = [];

    
    actionsSrv.suscribe('imageGenerated', function(image){
      $scope.image = image;
      //Suscribe to the loop
      rafSrv.start();
      rafSrv.suscribe(renderLayers, 'mainRenderLayers');
    });

    actionsSrv.suscribe('generatedImageUrl', function(url){
      $scope.imageSrc = url;
    })

    angular.element(document).ready(function(){
      //Todo add a method for declaring al components ready in the actionsSrv
      $timeout(function(){
        actionsSrv.trigger('init');
      }, 1000)

    });

    $scope.getTool = function(){
      return settingsSrv.getTool();
    }

    function renderLayers(){
      $scope.image.layers.map(function(layer,index){
        layer.setZoom(settingsSrv.getZoom(),index);
        if(layer.needsRendering()){
          layer.render(index);    
        }
      })
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

    $scope.paint = function(event, index){
      imageSrv.addPoint(event, index);
    }

    //TODO:Move this to tools bar
    $scope.generateImage = function(){
      imageSrv.generateImage();
    }
    $scope.generateHeatMap = function(){
      imageSrv.generateHeatMap();
    }
    $scope.generateHeatMapNpm = function(){
      imageSrv.generateHeatMapNpm();
    }

  }]);

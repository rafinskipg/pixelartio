'use strict';

angular.module('pixelartioApp')
  .controller('MainCtrl',[ '$scope', 'rafSrv', function ($scope, rafSrv) {
    $scope.layers = [];

    function init(){
      $scope.layers = [];
      $scope.layers.push(new Layer({ type : 'baseLayer', x : 300, y: 300 }));
      $scope.layers.push(new Layer({ type : 'transparent', x : 300, y: 300 }));
      rafSrv.suscribe(renderLayers, 'mainRenderLayers');
    }

    angular.element(document).ready(function(){
      rafSrv.start();
    });

    function hideLayer(layer){
      layer.hide();
    }

    function showLayer(layer){
      layer.show();
    }

    function setZoom(){
      $scope.layers.map(function(layer){
        layer.setZoom(getCurrentZoom());
      })
    }

    function renderLayers(){
      setZoom();
      $scope.layers.map(function(layer,index){
        layer.render(index);    
        //if(layer.needsRendering()){
          //layer.render(index);    
        //}
      })
    } 

    function getCurrentZoom(){
      return {
        scale: 5.0,
        centerAt: {
          x: 250,
          y: 250
        }
      }
    }

    init();

  }]);

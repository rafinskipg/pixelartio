'use strict';

angular.module('pixelartioApp')
  .controller('LayersCtrl', ['$scope', 'actionsSrv', 'imageSrv', function ($scope, actionsSrv, imageSrv) {

    $scope.showingLayers = false;

    actionsSrv.suscribe('openLayers', function(event){
      $scope.showingLayers = !$scope.showingLayers;
    });

    actionsSrv.suscribe('hideLayers', function(event){
      $scope.showingLayers = false;
    });

    actionsSrv.suscribe('imageGenerated', function(image){
      $scope.image = image;
      console.log('generated')
      $scope.activeLayer = image.layers[0];
    });

    actionsSrv.suscribe('activeLayer', function(layer){
      console.log('active', layer)
      $scope.activeLayer = layer;
    });

    $scope.addLayer = function(){
      imageSrv.addLayer();
    }

    $scope.setActiveLayer = function(layer){
      imageSrv.setActiveLayer(layer);
    }

    $scope.deleteLayer = function(layer){
      imageSrv.deleteLayer(layer);
      //$scope.currentLayer = $scope.image.layers[0];
    }

    $scope.hideLayer = function(layer){
      layer.hide();
      layer.updated = true;
    }

    $scope.showLayer = function(layer){
      layer.show();
      layer.updated = true;
    }

  }]);

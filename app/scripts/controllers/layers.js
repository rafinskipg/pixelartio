'use strict';

angular.module('pixelartioApp')
  .controller('LayersCtrl', ['$scope', 'actionsSrv', 'settingsSrv', function ($scope, actionsSrv, settingsSrv) {

    $scope.showingLayers = false;

    actionsSrv.suscribe('openLayers', function(event){
      $scope.showingLayers = true;
    });

    actionsSrv.suscribe('hideLayers', function(event){
      $scope.showingLayers = false;
    });

  }]);

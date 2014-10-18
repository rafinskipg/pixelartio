'use strict';

angular.module('pixelartioApp')
  .controller('ColorsCtrl', ['$scope', 'actionsSrv', 'settingsSrv', function ($scope, actionsSrv, settingsSrv) {

    $scope.showingColors = false;

    actionsSrv.suscribe('openColorPicker', function(event){
      $scope.showingColors = !$scope.showingColors;
    });

    actionsSrv.suscribe('hideColorPicker', function(event){
      $scope.showingColors = false;
    });

    $scope.colorPicked = function(color){
      settingsSrv.setCurrentColor(color);
      actionsSrv.trigger('colorPicked', color);
    }

    settingsSrv.setCurrentColor('black');

    /* Color  picker construction */
    function rgbToHex(R,G,B) {return toHex(R)+toHex(G)+toHex(B)}
    function toHex(n) {
      n = parseInt(n,10);
      if (isNaN(n)) return "00";
      n = Math.max(0,Math.min(n,255));return "0123456789ABCDEF".charAt((n-n%16)/16) + "0123456789ABCDEF".charAt(n%16);
    }
    
  }]);

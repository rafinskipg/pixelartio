'use strict';

angular.module('pixelartioApp')
  .controller('PickerCtrl', ['$scope', 'settingsSrv', function ($scope, settingsSrv) {

    $scope.generateRandomColor = function(){
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      setCurrentColor(color);  
    }
    
    function setCurrentColor(color){
      $scope.currentColor = color;
      settingsSrv.setCurrentColor($scope.currentColor);
    }

    setCurrentColor('red');

  }]);

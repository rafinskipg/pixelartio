'use strict';

angular.module('pixelartioApp')
  .provider('settingsSrv', function () {

    var currentColor;

    function setCurrentColor (color){
      currentColor = color;
    }

    function getCurrentColor(){
      return currentColor;
    }

    // Method for instantiating
    this.$get = function () {
      return {
        setCurrentColor: setCurrentColor,
        getCurrentColor: getCurrentColor
      }
    };
  });

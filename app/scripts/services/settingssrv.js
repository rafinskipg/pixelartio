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
    
    var tool;

    function setTool (color){
      tool = color;
    }

    function getTool(){
      return tool;
    }

    // Method for instantiating
    this.$get = function () {
      return {
        setCurrentColor: setCurrentColor,
        getCurrentColor: getCurrentColor,
        setTool: setTool,
        getTool: getTool
      }
    };
  });

'use strict';

angular.module('pixelartioApp')
  .provider('settingsSrv', function () {

    var currentColor;
    var tool;

    var base_width = 300;
    var base_height = 300;
    var visible_width = 500;
    var visible_height = 500;
    var center_x = 150;
    var center_y = 150;
    var zoom = 5.0;

    function setCurrentColor (color){
      currentColor = color;
    }

    function getCurrentColor(){
      return currentColor;
    }

    function setTool (color){
      tool = color;
    }

    function getTool(){
      return tool;
    }

    function getZoom(){
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

    function setZoom(zoom){
      
    }

    function getImageWidth(){
      return base_width;
    }
    function getImageHeight(){
      return base_height;
    }

    // Method for instantiating
    this.$get = function () {
      return {
        setCurrentColor: setCurrentColor,
        getCurrentColor: getCurrentColor,
        setTool: setTool,
        getTool: getTool,
        getZoom: getZoom,
        setZoom: setZoom,
        getImageWidth: getImageWidth,
        getImageHeight: getImageHeight
      }
    };
  });

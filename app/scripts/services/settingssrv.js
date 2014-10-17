'use strict';

angular.module('pixelartioApp')
  .provider('settingsSrv', function () {

    var currentColor;
    var tool;

    var base_width = 600;
    var base_height = 600;
    var visible_width = 800;
    var visible_height = 800;
    var center_x = 150;
    var center_y = 150;
    var zoom = 10.0;

    function setCurrentColor (color){
      currentColor = color;
    }

    function getCurrentColor(){
      return currentColor;
    }

    function setTool (t){
      tool = t;
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

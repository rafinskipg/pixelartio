'use strict';

angular.module('pixelartioApp')
  .provider('rafSrv', function () {

    // Private variables
    var suscriptions = {};
    var active = true;

    function suscribe(item, name){
      suscriptions[name] = item;
    }

    function stop(){
      active = false;
    }

    function start(){
      active = true;
      mainLoop();
    }

    function mainLoop() {
      for(var sus in suscriptions){
        suscriptions[sus]();
      }
      if(active){
        requestAnimationFrame(mainLoop);
      }
    }


    this.$get = function(){
      return {
        start: start,
        stop: stop,
        suscribe: suscribe
      }
    }
  });
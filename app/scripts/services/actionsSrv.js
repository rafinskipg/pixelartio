'use strict';

angular.module('pixelartioApp')
  .provider('actionsSrv', function () {

    var suscriptions = {};

    function suscribe(item, fn){
      if(!suscriptions[item]){
        suscriptions[item] = [];
      }
      
      suscriptions[item].push(fn);
    }

    function trigger(item){
      if(suscriptions[item]){
        suscriptions[item].forEach(function(item){
          item.apply(null, arguments);
        });
      }
    }

   
    // Method for instantiating
    this.$get = function () {
      return {
        suscribe: suscribe,
        trigger: trigger
      }
    };
  });

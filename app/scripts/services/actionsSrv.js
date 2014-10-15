'use strict';

angular.module('pixelartioApp')
  .provider('actionsSrv', function () {

    var suscriptions = {};

    function suscribe(item, fn){
      if(!suscriptions[item]){
        suscriptions[item] = [];
      }
      
      suscriptions[item].push(fn);
      console.log(suscriptions[item].length, item)
    }

    function trigger(item){
      if(suscriptions[item]){
        var args = [];
        Array.prototype.push.apply( args, arguments );
        args.shift();
        suscriptions[item].forEach(function(fn){
          fn.apply(null, args);
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

'use strict';

angular.module('pixelartioApp')
  .factory('imageGenerationSrv', ['$http', function ($http) {

    var endpoint = 'http://localhost:3000/gen-image'
    
    function generate(points){
      return $http.post(endpoint, {points : points });
    }

    
    return {
      generate: generate
    }
    
  }]);

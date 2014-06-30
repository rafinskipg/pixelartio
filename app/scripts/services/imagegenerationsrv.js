'use strict';

angular.module('pixelartioApp')
  .factory('imageGenerationSrv', ['$http', function ($http) {

    var endpointImage = 'http://localhost:3000/gen-image'
    var endpointHeatMap = 'http://localhost:3000/gen-heat-map'
    var endpointHeatMapNpm = 'http://localhost:3000/gen-heat-map-npm'
    
    function generate(points){
      return $http.post(endpointImage, {points : points });
    }
    function generateHeatMap(points){
      return $http.post(endpointHeatMap, {points : points });
    }
    function generateHeatMapNpm(points){
      return $http.post(endpointHeatMapNpm, {points : points });
    }

    
    return {
      generate: generate,
      generateHeatMap: generateHeatMap,
      generateHeatMapNpm: generateHeatMapNpm
    }
    
  }]);

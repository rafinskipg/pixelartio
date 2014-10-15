'use strict';

angular.module('pixelartioApp')
  .factory('imageSrv', [ 'actionsSrv', 'settingsSrv', 'imageGenerationSrv', function ( actionsSrv, settingsSrv, imageGenerationSrv) {

    var image, currentLayer;

    //TODO : pick this from settings
    function newImage(){
      return new ImagePixel(settingsSrv.getImageWidth(), settingsSrv.getImageHeight());  
    }


    actionsSrv.suscribe('init', function(){
      image = newImage();
      actionsSrv.trigger('imageGenerated', image);
      //Warm up
      setActiveLayer(image.layers[0]);
    });


    function setActiveLayer(layer){
      currentLayer = layer;
      console.log('triggering layer')
      actionsSrv.trigger('activeLayer', layer);
    }

    function getActiveLayer(){
      if(!currentLayer){
        setActiveLayer(image.layers[0]);
      }
      return currentLayer;
    }

    function deleteLayer(layer){
      image.deleteLayer(layer);
      actionsSrv.trigger('activeLayer', image.layers[0]);
    }

    function addLayer(){
      image.addLayer();
      //TOdo maybe is layers.length -1
      setActiveLayer(image.layers[0]);
    }
    
    //Canvas clicked
    function addPoint(ev, canvasIndex){
      if(settingsSrv.getTool() == 'pen'){
        getActiveLayer().paint(ev, settingsSrv.getCurrentColor(), canvasIndex);
      }else if(settingsSrv.getTool() == 'eraser'){
        getActiveLayer().deletePoint(ev, settingsSrv.getCurrentColor(), canvasIndex);
      }
    }

    //Returns the arrayo f painted points
    function getPoints(){
      var points = [];

      image.layers.map(function(layer,index){
        layer.setZoom(getCurrentZoom(),index);
        if(layer.visible ){
          var layerPoints = layer.getRenderingPoints();    
          points = points.concat(layerPoints);
        }
      })
      return points;
    }

    function generateImage(){
      var points = getPoints();

      imageGenerationSrv.generate(points)
        .then(function(response){
          actionsSrv.trigger('generatedImageUrl', response.data.url);
        })
        .catch(function(fail){
          console.log('eee')
        })
    }
    function generateHeatMap(){
      var points = getPoints();

      imageGenerationSrv.generateHeatMap(points)
        .then(function(response){
          actionsSrv.trigger('generatedImageUrl', response.data.url);
        })
        .catch(function(fail){
          console.log('eee')
        })
        
    }

    function generateHeatMapNpm(){
      var points = getPoints();

      imageGenerationSrv.generateHeatMapNpm(points)
        .then(function(response){
          actionsSrv.trigger('generatedImageUrl', response.data.url);
        })
        .catch(function(fail){
          console.log('eee')
        })
        
    }



    return {
      setActiveLayer: setActiveLayer,
      getActiveLayer: getActiveLayer,
      addLayer: addLayer,
      deleteLayer: deleteLayer, 
      addPoint: addPoint,
      generateImage:generateImage,
      generateHeatMap: generateHeatMap,
      generateHeatMapNpm:generateHeatMapNpm
    }

}]);

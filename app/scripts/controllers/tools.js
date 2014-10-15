'use strict';

angular.module('pixelartioApp')
  .controller('ToolsCtrl', ['$scope', 'settingsSrv', 'actionsSrv', function ($scope, settingsSrv, actionsSrv) {

    $scope.tools = [];

    var pen = {
      type : 'pen', 
      name : 'Pen',
      classIcon: 'glyphicon glyphicon-pencil',
      action : function(){
        settingsSrv.setTool('pen');
      }
    }

    $scope.tools.push(pen);
    

    var eraser = {
      type : 'eraser', 
      name : 'Eraser',
      classIcon: 'glyphicon glyphicon-remove-sign',
      action : function(){
        settingsSrv.setTool('eraser');
      }
    }

    $scope.tools.push(eraser);

    var download = {
      type : 'download', 
      name : 'Download',
      classIcon: 'glyphicon glyphicon-cloud-download',
      action : function(){
        settingsSrv.download();
      }
    }

    $scope.tools.push(download); 

    var fullscreen = {
      type : 'fullscreen', 
      name : 'fullscreen',
      classIcon: 'glyphicon glyphicon-fullscreen',
      action : function(){
        settingsSrv.fullscreen();
      }
    }

    $scope.tools.push(fullscreen);

    var layers = {
      type : 'layers', 
      name : 'layers',
      classIcon: 'glyphicon glyphicon-align-justify',
      action : function(){
        console.log('e')
        actionsSrv.trigger('openLayers');
      }
    }

    $scope.tools.push(layers);
  }]);

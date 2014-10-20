/*jshint unused:false */
'use strict';

/*angular
  .module('pixelartioApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });*/



var app;

(function(angular) {

    var moduleDependencies = [];

    moduleDependencies = [
        'ui.router'
    ];

    app = angular.module('pixelartioApp', moduleDependencies);


    app.run(['$rootScope',
        function($rootScope) {

        }
    ]);


}(angular));


/* global app */

'use strict';


(function(app) {

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/main');

            $stateProvider

            .state('main', {
                url: '/main',
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })

            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            });

        }
    ]);

}(app));

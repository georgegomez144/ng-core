/*
 * Add routing here
 * 
*/
(function() {
  'use strict';
  
  angular.module('ng-core')
    .config([
      '$routeProvider', '$locationProvider',
      function($routeProvider, $locationProvider) {
        
        // remove # form url to use clean url.
        // NOTE: Make sure to inlcude the <base href="/"> in the index.html page
        $locationProvider.html5Mode(true);

        var template = 'js/core/templates/';
        $routeProvider()
          .when('/',{
            templateUrl: templates + 'home/index.html',
            controller: 'HomeCtrl',
            controllerAs: 'Home'
          })
          .otherwise('/');
      }
    ]);
})();
/*
 * Add routing here
 * 
*/

angular.module('ng-core')
  .config([
    '$routeProvider',
    function($routeProvider) {
      var template = 'js/core/templates/';
      $routeProvider()
        .when('/home',{
          templateUrl: templates + 'home/index.html',
          controller: 'HomeCtrl',
          controllerAs: 'Home'
        });
    }
  ]);
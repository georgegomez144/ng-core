(function() {
  'use strict';
  
  angular.module('ng-core')
    .factory('HashFactory', [
      '$log',
      function($log) {
        return {
          sha1: function(param) {
            return Sha1.hash(param);
          }
        };
      }
    ]);
})();
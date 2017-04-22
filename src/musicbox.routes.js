(function () {
    'use strict';

angular.module('musicbox').config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/dashboard', {
          template: '<dashboard></dashboard>'
        }).
        otherwise('/dashboard');
    }
]);
})();

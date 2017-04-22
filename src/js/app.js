var musicbox = angular.module('musicbox', [
	"ngRoute",
	"dashboard"
]);

musicbox.config(['$locationProvider' ,'$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider.
        when('/dashboard', {
          template: '<dashboard></dashboard>'
        }).
        otherwise('/dashboard');
    }
]);

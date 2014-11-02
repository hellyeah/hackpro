'use strict';

/**
 * @ngdoc overview
 * @name hackproApp
 * @description
 * # hackproApp
 *
 * Main module of the application.
 */
angular
  .module('hackproApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/hackprofile/:hack', {
        templateUrl: 'views/hackprofile.html',
        controller: 'HackprofileCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

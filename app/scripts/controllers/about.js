'use strict';

/**
 * @ngdoc function
 * @name hackproApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the hackproApp
 */
angular.module('hackproApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

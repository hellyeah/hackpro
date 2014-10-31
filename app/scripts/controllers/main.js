'use strict';

/**
 * @ngdoc function
 * @name hackproApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hackproApp
 */
angular.module('hackproApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

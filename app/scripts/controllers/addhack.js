'use strict';

/**
 * @ngdoc function
 * @name hackproApp.controller:AddhackCtrl
 * @description
 * # AddhackCtrl
 * Controller of the hackproApp
 */
angular.module('hackproApp')
  .controller('AddhackCtrl', function ($scope, $firebase) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // var URL = "https://hackpro.firebasio.com/";
    // var ref = new Firebase(URL);
    // var sync = $firebase(ref);

    // var list = sync.$asObject();

    // list.$loaded().then(function() {
    //  console.log("list has " + list.length + " items");
    // });
    // //console.log($scope.list);
    // $scope.list = list;

    // $scope.addHackToFirebase = function (hack) {
    //     console.log('blah');
    // }

    var firebaseURL = "https://hackpro.firebaseio.com/";
    var ref = new Firebase(firebaseURL);
    var sync = $firebase(ref);
    //sync.$set({Overboard: "bar"});
    var hack = sync.$asObject();
    hack.$loaded().then(function() { 
        console.log("list has " + hack.length + " items");
        console.log(hack);
    });
    $scope.hackName = "";
    $scope.hackString = "";
    $scope.hackObj = function() {
        return JSON.parse($scope.hackString);
    };

    $scope.addHack = function() {
        $scope.addHackToFirebase($scope.hackName, $scope.hackObj());
    }

    $scope.addHackToFirebase = function(hackName, hackObj) {
        //hack.push({foo: 'bar'});
        hack[hackName] = hackObj;
        console.log(hack);
        hack.$save().then(function(ref) {
           ref.name() === hack.$id; // true
        }/*, optional error callback */);
    }

  });

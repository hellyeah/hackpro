'use strict';

/**
 * @ngdoc function
 * @name hackproApp.controller:HackprofileCtrl
 * @description
 * # HackprofileCtrl
 * Controller of the hackproApp
 */
angular.module('hackproApp')
  .controller('HackprofileCtrl', function ($scope, $firebase) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // now we can use $firebase to synchronize data between clients and the server!
    // **use https://hackpro.firebaseio.com/*hackname to access data for a specific hack
    // **have all hacks in one big https://hackpro.firebaseio.com with their names as their ids
    // **maybe use /software/overboard same url ending as firebase
    var ref = new Firebase("https://hackpro.firebaseio.com/overboard");
    var sync = $firebase(ref);
    //sync.$set({Overboard: "bar"});
    var hack = sync.$asObject();
    hack.$loaded().then(function() {
        $scope.generatePost(hack);
    })
    $scope.hack = hack;
    console.log($scope.hack);
    $scope.post = {};

    //CRAZY SHIT
    $scope.generatePost = function (hack) {
        console.log(hack);
        $scope.blogPost(hack.title, hack.pictures, hack.tagline, hack.appDetails, hack.users, hack.competition, hack.builtWith, hack.platforms, function(post) {
            console.log(post);
        });
    }

    //**ADD IN SPECIAL CASES LIKE AWARDS & DATES -- look out for special cases not accounted for**//
    //look for date in hackathon object?
    $scope.blogPost = function(title, images, tagline, description, hackers, competition, skills, builtWith, platforms, callback) {
        //title 
        $scope.post.title = title;
        //pictures 
        $scope.post.images = images;
        //tagline
        $scope.post.tagline = tagline;
        //intro - Peter Klipfel, Christopher Baker, and Kaijah Hougham built Color Reno and won best in show at Hack4Reno 2014.
        $scope.generateIntro(hackers, competition, function(intro) {
            $scope.post.intro = intro;
        });
        //builtWith - They built it for Web using css, javascript, python, ruby, and shell.
        $scope.generateBuiltWith(skills, platforms, function(builtWith) {
            $scope.posts.builtWith = builtWith;
        })
        //whatTheySaid - ...
        $scope.post.whatTheySaidIntro = "Here’s what they had to say about Color Reno:"
        $scope.post.whatTheySaid = description;
        //individualProfiles - Peter is a full-stack developer from Longmonth, Colorado. You can check out his website here: http://peterklipfel.com/
        //will need to run a look
        $scope.post.profiles = [];
        for (var i=0; i < hackers.length; i++) {
            $scope.generateProfile(hackers[i], function(profile) {
                $scope.post.profiles.push(profile);            
            })
        };
        return $scope.post;
    }

    $scope.generateIntro = function(hackers, competition, callback) {
        return "intro";
    }

    $scope.generateBuiltWith = function(skills, platforms, callback) {
        return "skills/platforms"
    }
    $scope.generateProfile = function(hacker, callback) {
        return "Hacker Profile"
    }
    $scope.printPost = function() {
        console.log($scope.post);
    }


  });




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
    var ref = new Firebase("https://hackpro.firebaseio.com/overboard/color-reno");
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
    $scope.blogPost = function(title, images, tagline, description, hackers, competition, skills, platforms, callback) {
        //title 
        $scope.post.title = title;
        //pictures 
        $scope.post.images = images;
        //tagline
        $scope.post.tagline = tagline;
        //intro - Peter Klipfel, Christopher Baker, and Kaijah Hougham built Color Reno and won best in show at Hack4Reno 2014.
        $scope.generateIntro(hackers, competition, title);
        //builtWith - They built it for Web using css, javascript, python, ruby, and shell.
        $scope.generateBuiltWith(skills, platforms)
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
        //return $scope.post;
    }

    $scope.generateIntro = function(hackers, competition, title) {
        $scope.post.intro = "";
        //names
        for(var i = 0; i < hackers.length; i++) {
            if (i>0) {
                if (i === hackers.length-1) {
                    $scope.post.intro += " and";
                }
                else if (i < hackers.length-1) {
                    $scope.post.intro += ",";
                }
                $scope.post.intro += " ";
            }
            $scope.post.intro += hackers[i].username;
        }

        $scope.post.intro += " built ";
        $scope.post.intro += title + " ";
        if (competition) {
            $scope.post.intro += "at the " + competition + ".";          
        }
        return "intro2";
    }
    /*SERIES FUNCTION SO WE ARENT REDUNDANTLY WRITING CODE
    $scope.series = function(series, attr) {
        $scope.seriesCopy = "";
        for(var i = 0; i < series.length; i++) {
            //**need to use AND
            console.log($scope.post.intro);
            if (i>0) {
                if (i === hackers.length-1) {
                    $scope.post.intro += " and";
                }
                else if (i < hackers.length-1) {
                    $scope.post.intro += ",";
                }
                $scope.post.intro += " ";
            }
            $scope.post.intro += hackers[i][attr];
        }
    }
    */
    

    $scope.generateBuiltWith = function(skills, platforms, callback) {
        $scope.post.builtWith = "";
        if (skills.length != 0 || platforms.length != 0) {
            $scope.post.builtWith += "They built it for ";  

            for(var i=0; i<platforms.length; i++) {
                if (i>0) {$scope.post.builtWith += "/"}
                $scope.post.builtWith += platforms[i];
            }

            $scope.post.builtWith += " ";
            if (skills.length > 0) {
                $scope.post.builtWith += "using ";
            }

            for(var i = 0; i < skills.length; i++) {
                if (i>0) {
                    if (i === skills.length-1) {
                        $scope.post.builtWith += " and";
                    }
                    else if (i < skills.length-1) {
                        $scope.post.builtWith += ",";
                    }
                    $scope.post.builtWith += " ";
                }
                $scope.post.builtWith += skills[i];
            }
            $scope.post.builtWith += ".";
        }
    }

    $scope.generateProfile = function(hacker, callback) {
        //$scope.post.profiles.push(hacker.username);
        return hacker.username
    }
    $scope.printPost = function() {
        console.log($scope.post);
    }


  });




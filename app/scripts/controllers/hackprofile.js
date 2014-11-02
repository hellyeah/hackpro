'use strict';

/**
 * @ngdoc function
 * @name hackproApp.controller:HackprofileCtrl
 * @description
 * # HackprofileCtrl
 * Controller of the hackproApp
 */
angular.module('hackproApp')
  .controller('HackprofileCtrl', function ($scope, $timeout, $routeParams, $firebase) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    // now we can use $firebase to synchronize data between clients and the server!
    // **use https://hackpro.firebaseio.com/*hackname to access data for a specific hack
    // **have all hacks in one big https://hackpro.firebaseio.com with their names as their ids
    // **maybe use /software/overboard same url ending as firebase
    var firebaseURL = "https://hackpro.firebaseio.com/" + $routeParams.hack;
    var ref = new Firebase(firebaseURL);
    var sync = $firebase(ref);
    //sync.$set({Overboard: "bar"});
    var hack = sync.$asObject();
    hack.$loaded().then(function() {
        $scope.hack = hack;  
        $scope.post = {};

        //MAGIC//
        $scope.generatePost(hack, function(post) {
            console.log(post);
        });
        //after DOM is rendered, make links work immediately
        $timeout($scope.makeLinksWork, 0);
    })


    //CRAZY SHIT
    $scope.generatePost = function (hack, callback) {
        //console.log(hack);
        $scope.blogPost(hack.title, hack.pictures, hack.tagline, hack.appDetails, hack.users, hack.competition, hack.builtWith, hack.platforms, function(post) {
            callback(post);
            //$scope.makeLinksWork();
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
        $scope.generateIntro(hackers, competition, title, function(intro) {
            //console.log('generated intro');
            $scope.post.intro = intro;
            console.log('intro generated');
            //$scope.makeLinksWork();
        });
        //builtWith - They built it for Web using css, javascript, python, ruby, and shell.
        $scope.generateBuiltWith(skills, platforms, function(builtWith) {
            $scope.post.builtWith = builtWith;
            console.log('builtWith generated')
        });
        //whatTheySaid - ...
        $scope.post.whatTheySaidIntro = "Here’s what they had to say about Color Reno:"
        $scope.post.whatTheySaid = description;
        //individualProfiles - Peter is a full-stack developer from Longmonth, Colorado. You can check out his website here: http://peterklipfel.com/
        //will need to run a look
        $scope.generateProfiles(hackers, function(profiles) {
            $scope.post.profiles = profiles;
            console.log('profiles generated')
        })
        //$scope.post.profiles = [];
        callback($scope.post);
    }

    $scope.generateIntro = function(hackers, competition, title, callback) {
        //console.log('start generating intro');
        var intro = "";
        //names
        for(var i = 0; i < hackers.length; i++) {
            if (i>0) {
                if (i === hackers.length-1) {
                    intro += " and";
                }
                else if (i < hackers.length-1) {
                    intro += ",";
                }
                intro += " ";
            }
            //$scope.post.intro += hackers[i].username;
            //$scope.post.intro += $scope.insertLink(hackers[i].username, "http://github.com/hellyeah");
            intro += hackers[i].username.link("http://github.com/hellyeah");
            //$scope.makeLinksWork();
        }
        intro += " built ";
        intro += title + " ";
        if (competition) {
            intro += "at the " + competition + ".";          
        }
        callback(intro);
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
        var builtWith = "";
        if (skills.length != 0 || platforms.length != 0) {
            builtWith += "They built it for ";  

            for(var i=0; i<platforms.length; i++) {
                if (i>0) {builtWith += "/"}
                builtWith += platforms[i];
            }

            builtWith += " ";
            if (skills.length > 0) {
                builtWith += "using ";
            }

            for(var i = 0; i < skills.length; i++) {
                if (i>0) {
                    if (i === skills.length-1) {
                        builtWith += " and";
                    }
                    else if (i < skills.length-1) {
                        builtWith += ",";
                    }
                    builtWith += " ";
                }
                builtWith += skills[i];
                //$scope.makeLinksWork();
            }
            builtWith += ".";
        }
        callback(builtWith);
    }

    $scope.generateProfiles = function(hackers, callback) {
        var profiles = [];
        for (var i=0; i < hackers.length; i++) {
            $scope.generateProfile(hackers[i], function(profile) {
                //console.log('profile');
                profiles.push(profile);
            })
        };
        callback(profiles)
    }

    $scope.generateProfile = function(hacker, callback) {
        callback(hacker.username);
    }
    $scope.printPost = function() {
        console.log($scope.post);
    }

    //pass in a string and the url you want it to link to
    //to call, find matches for a certain string and replace those matches with this
    //str.replace(string, insertLink(string, url));
    // $scope.insertLink = function(string, url) {
    //     return '<a href="' + url + '">' + string + '</a>';
    // }

    $scope.makeLinksWork = function() {
        console.log('make links work');
        console.log($scope.post);
        var ps = document.getElementsByTagName('p');
        console.log('ps:');
        console.log(ps);
        for(var i =0; i < ps.length; i++) { 
            ps[i].innerHTML = ps[i].textContent;
        }
    }


  });





// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller('SampleCtrl', function ($scope, $firebaseArray, $firebaseAuth) {
    //    var ref = firebase.database().ref();
    //    var fNameSyncObject = $firebaseObject(ref.child('fName'));
    //    var lNameSyncObject = $firebaseObject(ref.child('lName'));
    //    fNameSyncObject.$bindTo($scope, "fName");
    //    lNameSyncObject.$bindTo($scope, "lName");

    var ref = firebase.database().ref().child('users');

    $scope.users = $firebaseArray(ref);
    $scope.data = {}

    $scope.login = function () {
        var auth = $firebaseAuth();

        // login with Facebook
        auth.$signInWithPopup("facebook").then(function (firebaseUser) {
            console.log("Signed in as:", firebaseUser.uid);
        }).catch(function (error) {
            console.log("Authentication failed:", error);
        });
    }

    $scope.add = function () {
        console.log($scope.data)
        $scope.users.$add({
            'fName': $scope.data.fName,
            'lName': $scope.data.lName
        });
        console.log($scope.users);
    }

})

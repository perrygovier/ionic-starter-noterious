'use strict';

angular.module('noterious', [
  'ionic',
  'firebase',
  'noterious.common'
])

  .run(function($ionicPlatform, $rootScope, $state) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });

  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    event.preventDefault();
    if (error === 'AUTH_REQUIRED') {
      $state.go('login');
    }
  });
  })
  .constant('ENDPOINT_URI', 'https://noterious.firebaseio.com/')
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/boards');

    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: 'app/login/login.tmpl.html',
        controller: 'LoginCtrl as login'
      })
      .state('boards', {
        url:'/boards',
        templateUrl: 'app/boards/boards-mdv.tmpl.html',
        controller: 'BoardsCtrl as ctrl',
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            return Auth.$requireAuth();
          }]
        }
      })
      .state('notes', {
        url:'/boards/:boardId/notes',
        templateUrl: 'app/notes/notes-mdv.tmpl.html',
        controller: 'NotesCtrl as ctrl',
        resolve: {
          'currentUser': ['Auth', function (Auth) {
            return Auth.$requireAuth();
          }]
        }
      })
    ;
  })
;

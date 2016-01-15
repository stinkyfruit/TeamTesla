/**
 * Created by VaibhavNamburi on 11/01/2016.
 */
angular.module('which.controllers.app', ['which.factory','ionic','ionic.contrib.ui.tinderCards'])

  .controller('AppCtrl', function($scope, $state, $ionicModal,User, $timeout, WhichFactory) {

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('app/menu.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.notLoggedIn = function(){
      return !User.isloggedIn()
    };

    $scope.logOut = function(){
      User.signOut();
      $scope.modal.hide();
    };

    $scope.browseTags = function() {
      $state.go('app.tagView');
      $scope.modal.hide();
    };

    $scope.create = function() {
      $state.go('app.create');
    };

    $scope.login = function() {
      $state.go('app.login');
      $scope.modal.hide();
    };

    $scope.signUp = function() {
      $state.go('app.signUp');
      $scope.modal.hide();
    };

    $scope.myWhiches = function() {
      $state.go('app.whichesByUser');
      $scope.modal.hide();
    };

    $scope.startWhiches = function(){
      WhichFactory.getNew().then(function(which) {
        $state.go('app.which', {
          id: which[0].id,
          question: which[0].question,
          thingA: which[0].thingA,
          thingB: which[0].thingB
          //tags: which.tags
        });
        $scope.modal.hide();
      }); 
    };
  })

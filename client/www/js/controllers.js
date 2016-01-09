angular.module('which.controllers', ['which.factory', 'ionic.contrib.ui.tinderCards'])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/userMenu.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  // $scope.closeLogin = function() {
  //   $scope.modal.hide();
  // };

  // Open the login modal
  // $scope.login = function() {
  //   $scope.modal.show();
  // };

  // Perform the login action when the user submits the login form
  // $scope.doLogin = function() {
  //   console.log('Doing login', $scope.loginData);

  //   // Simulate a login delay. Remove this and replace with your login
  //   // code if using a login system
  //   $timeout(function() {
  //     $scope.closeLogin();
  //   }, 1000);
  // };

  $scope.browseTags = function() {
    $state.go('app.tagView');
    $scope.modal.hide();
  }

  $scope.create = function() {
    $state.go('app.create');
  }

})

.controller('WhichCtrl', function($scope, $state, $stateParams, WhichFactory) {
  $scope.username = 'Me';

  //Defaults the slider to the second "Image" Where are currently hosting the question
  $scope.activeSlide = 1;

  //Probably only initially need id, question, thingA, thingB,
  //Demo object used during development
  $scope.which = {
    id: $stateParams.id,
    question: $stateParams.question,
    thingA: $stateParams.thingA,
    thingB: $stateParams.thingB
      //tags: which.tags
  }

  console.log($scope.which);

  //Slider takes in an array, thus using the sandwich structure to display text between two images
  $scope.things = [$scope.which.thingA, $scope.which.question, $scope.which.thingB];


  $scope.cardSrc = '';
  $scope.cardPartialSwipe = function(amt) {
    var threshold = .15;
    if (amt < 0 - threshold) {
      $scope.cardSrc = $scope.which.thingA;
    } else if (amt > threshold) {
      $scope.cardSrc = $scope.which.thingB;
    } else {
      $scope.cardSrc = '';
    }
  };

  //This gets called when the user swipes, making a decision with the choice from the user
  $scope.decide = function(choice) {
    WhichFactory.choose(choice, $scope.which.id, $scope.username).then(function(votingResult) {
      console.log(votingResult)

      //Allows for state change, showing new view, second argument is the params being sent in to display results
      $state.go('app.result', {
        a: votingResult.votesForA,
        b: votingResult.votesForB
      });
    });

  }
})

.controller('ResultCtrl', function($scope, $state, $stateParams, WhichFactory) {

  $scope.a = $stateParams.a;
  $scope.b = $stateParams.b;

  //Function displays new which, calling the getNew factory function, and navigating to which page along with the newest which.
  $scope.getNewWhich = function() {
    WhichFactory.getNew().then(function(which) {

      $state.go('app.which', {
        id: which.id,
        question: which.question,
        thingA: which.thingA,
        thingB: which.thingB
          //tags: which.tags
      });
    });
  };
})

.controller('CreateCtrl', function($scope, $state, WhichFactory) {
  //sets the options for the "Media Type" drop-down
  $scope.items = [{
    id: 1,
    label: 'Image'
  }, {
    id: 2,
    label: 'Text'
  }];

  //Assign the first option from select tag
  $scope.mediaType = $scope.items[0];


  //Submission of Which with input details
  $scope.submit = function(type, question, a, b, tags) {

    var which = {
      question: question,
      createdBy: 'anon', //TODO: change createdBy
      tags: tags.split(' '),
      type: type.label.toLowerCase(),
      thingA: a,
      thingB: b
    }

    WhichFactory.submit(which);

    //Landing page after submission
    $state.go('app.afterCreate');
  }

})

.controller('AfterCreateCtrl', function($scope, $state, WhichFactory) {

  //Load newest function after submission of previous which
  $scope.getNewWhich = function() {
    WhichFactory.getNew().then(function(which) {

      $state.go('app.which', {
        id: which.id,
        question: which.question,
        thingA: which.thingA,
        thingB: which.thingB
          //tags: which.tags
      });
    });
  };

  //Navigate to creation page via state change
  $scope.create = function() {
    $state.go('app.create');
  }

})

.controller('TagViewCtrl', function($scope, $state, WhichFactory) {
  $scope.whiches = [];

  $scope.getWhichesByTag = function(tag) {
    WhichFactory.getWhichesByTag(tag).then(function(whiches) {
      $scope.whiches = whiches;
    })
  }

  $scope.goToWhich = function(id) {
    WhichFactory.getWhichByID(id).then(function(which) {
      $state.go('app.which', which);
    })
  }
});

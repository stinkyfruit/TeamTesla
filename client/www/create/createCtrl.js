angular.module('which.controllers.create', ['which.factory', 'ionic.contrib.ui.tinderCards','ngFileUpload'])

.controller('CreateCtrl', function($scope, $state, WhichFactory, $cordovaImagePicker, $ionicPlatform, ImageUploadService, $cordovaCamera, $ionicLoading, $ionicScrollDelegate, $timeout) {
  //sets the options for the "Media Type" drop-down
  $scope.items = [{
    id: 1,
    label: 'Image'
  }, {
    id: 2,
    label: 'Text'
  }];
  $scope.imageDb = 'hi';
  $scope.data = {
    mediaType: $scope.items[0],
    question: '',
    thingA: '',
    thingB: '',
    tags: ''
  }


  // ionic loading screen
  $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };


  //Submission of Which with input details
  $scope.submit = function() {
 
    // console.log($scope.imageDb);
    var which = {
      question: $scope.data.question,
      createdBy: window.localStorage.getItem('which.userToken'),
      tags: $scope.data.tags.split(' '),
      type: $scope.data.mediaType.label.toLowerCase(),
      thingA: $scope.data.thingA,
      thingB: $scope.data.thingB,
      imageURI: $scope.imageDb
    }

    WhichFactory.submit(which);

    //Landing page after submission
    $state.go('app.afterCreate');
  }

  $scope.originalData = angular.copy($scope.data);

  $scope.$on('clear', function(event, state) {
    if (state === 'app.create')
      $scope.data = $scope.originalData;
  });


  $scope.collection = {
    selectedImage : []
  };

  /*
  IonicPlatform.ready ensures that the application is fully booted and ready prior to getting access to native features
  $cordovaImagePicker gives access to the gallery and on confirmation returns an array of rooth paths to the image
   */
   $scope.resize = function () {
    $ionicScrollDelegate.resize()
   }

  $ionicPlatform.ready(function() {

    // $scope.getImage = function() {
    //   // Image picker will load images according to these settings
    //   var options = {
    //     maximumImagesCount: 2, // Max number of selected images
    //     width: 800,
    //     height: 800,
    //     quality: 80            // Higher is better
    //   };

    //   $cordovaImagePicker.getPictures(options).then(function (results) {
    //     //If repeated selection, set the scope to an empty array
    //     $scope.collection.selectedImage = [];

    //     // Loop through acquired images
    //     for (var i = 0; i < results.length; i++) {
    //       console.log('Image URI: ' + results[i]);
    //       $scope.collection.selectedImage.push(results[i]);   // We load only one image so we can use it like this

    //       uploadFiles(results[i])
    //     }

    //   }, function(error) {
    //     console.log('Error: ' + JSON.stringify(error));    // In case of error
    //   });
    // };

    // take picture with camera

    $scope.getImage = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth:300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                        $scope.imageDb = imageData;
                        setTimeout(function () {
                          $ionicScrollDelegate.resize()
                        },0)
                        
                    }, function (err) {

                        // An error occured. Show a message to the user
                    });
                }



    $scope.takePic = function () {
      
      // $scope.show($ionicLoading);
      
      var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: false,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 500,
                    targetHeight: 500,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                  };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                        $scope.imageDb = imageData;
                        $ionicScrollDelegate.resize();
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
                  
    

  });

  /*
  Service function that returns a promise and assigns generated URLS to thingA || thingB
   */

  function uploadFiles(imageData){


    ImageUploadService.uploadImage(imageData).then(
      function(result) {


        var urlSmall;

        if(result && result.secure_url) urlSmall = result.secure_url || '';

        console.log('successful image upload',urlSmall)
        //$scope.urlCollection.push(urlSmall)
        if(!$scope.data.thingA){
          $scope.data.thingA = urlSmall
          console.log('thingA',$scope.data.thingA)
        }
        else if(!$scope.data.thingB){
          $scope.data.thingB = urlSmall
          console.log('thingB',$scope.data.thingB)
        }
      },
      function(err) {

        console.dir(err)

      })
  }

  


})


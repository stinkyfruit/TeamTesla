angular.module('which.controllers.create', ['which.factory', 'ionic.contrib.ui.tinderCards','ngFileUpload'])

.controller('CreateCtrl', function($scope, $state, WhichFactory, $ionicPlatform, $cordovaCamera, $ionicActionSheet) {
  
  $scope.data = {
    question: '',
    thingA: '',
    thingB: '',
    tags: '',
    imageURI: ''
  }


  //Submission of Which with input details
  $scope.submit = function() {
 
    var which = {
      question: $scope.data.question,
      createdBy: window.localStorage.getItem('which.userToken'),
      tags: $scope.data.tags.split(' '),
      thingA: $scope.data.thingA,
      thingB: $scope.data.thingB,
      imageURI: $scope.imageDb,
    }

    WhichFactory.submit(which);
    //Landing page after submission
    $scope.data = {
    question: '',
    thingA: '',
    thingB: '',
    tags: '',
    imageURI: ''
    }
    $scope.imageDb = '';
    $state.go('app.whichesByUser');
  }

  // $scope.originalData = angular.copy($scope.data);

  // $scope.$on('clear', function(event, state) {
  //   if (state === 'app.create')
  //     $scope.data = $scope.originalData;
  // });


  // $scope.collection = {
  //   selectedImage : []
  // };

  /*
  IonicPlatform.ready ensures that the application is fully booted and ready prior to getting access to native features
  $cordovaImagePicker gives access to the gallery and on confirmation returns an array of rooth paths to the image
   */
   $scope.resize = function () {
    $ionicScrollDelegate.resize()
   }

  $ionicPlatform.ready(function() {

    $scope.getImage = function () {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth:500,
        targetHeight: 500,
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
      
      var options = 
      {
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

  // function uploadFiles(imageData){


  //   ImageUploadService.uploadImage(imageData).then(
  //     function(result) {


  //       var urlSmall;

  //       if(result && result.secure_url) urlSmall = result.secure_url || '';

  //       console.log('successful image upload',urlSmall)
  //       //$scope.urlCollection.push(urlSmall)
  //       if(!$scope.data.thingA){
  //         $scope.data.thingA = urlSmall
  //         console.log('thingA',$scope.data.thingA)
  //       }
  //       else if(!$scope.data.thingB){
  //         $scope.data.thingB = urlSmall
  //         console.log('thingB',$scope.data.thingB)
  //       }
  //     },
  //     function(err) {

  //       console.dir(err)

  //     })
  // }

  $scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: 'Use Camera' },
       { text: 'From Gallery' }
     ],
     titleText: 'Upload a Photo',
     cancelText: 'Cancel',
     cancel: function() {
          // add cancel code..
        },
     buttonClicked: function(index) {
       if (index === 0 ) {
        $scope.takePic();
       } else {
        $scope.getImage();
       }
       return true;
     }
   });
 }



})


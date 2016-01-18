/**
 * Created by VaibhavNamburi on 8/01/2016.
 */
angular.module('which.factory', [])

.factory('WhichFactory', function($http, $state) {

  var token = 'someRandomString';

  $http.defaults.headers.common.Authorization = 'Bearer' + token;


  var serverURI = 'http://secure-castle-2561.herokuapp.com';
  //var serverURI = 'http://localhost:5007'
  //'http://secure-castle-2561.herokuapp.com';



  var defaultImage = function(image){
   if(image.length === 0){
      return 'http://cristinaistrati.com/uploads/default/2013/07/which-way-to-go.jpg';
    } else {
      return "data:image/jpeg;base64," + image;
    }
  };
  /*
   * choose function is called after a decision has been made.
   * Sends an HTTP POST request to /api/which/{{id}}/judge.
   * TODO : Send a response back with the results object.
   **/
  var choose = function(choice, id, username) {

    var uri = serverURI + '/api/which/' + id + '/judge';

    return $http.post(uri, {
        userID: username,
        choice: choice
      })
      .then(function(res) {
        return res.data;
      }, function(err) {
        return err;
      });
  };

  /* reporting function to update report count
   * SENDS a HTTP POST request to  
  **/
  var reporting = function(whichObj){
    var uri  = serverURI + '/api/which/' + whichObj.id + '/report';
    //$http post shortcut method takes in a url and request data
    return $http.post(uri, {
      }).then(function(res){
        return res.data;
      }, function(err) {
        return err;
      });
  };


  /*
   * getNew function is called to retrieve the next available which.
   * Sends an HTTP GET request to /api/which
   * Utilized in the getNewWhich function below
   **/
  var getNew = function() {
    return $http.get(serverURI + '/api/which', {
        params: {
          userID: window.localStorage.getItem('which.userToken')
        }
      })
      .then(function(res) {
        return res.data;
      }, function(err) {
        return err;
      });
  };

  /*
   * submit function is called to submit a new Which
   * Sends an HTTP POST request to /api/which
   **/
  var submit = function(which) {
    return $http.post(serverURI + '/api/which', which)
      .then(function(res) {

        return res.data;
      }, function(err) {
        return err;
      });
  };

  /*
   * Gets all the whiches with a certain tag
   * Sends an HTTP get request to /api/tag/{{tag}}?username=myuserid
   **/
  var getWhichesByTag = function(tag) {
    return $http.get(serverURI + '/api/tag/' + tag, {
        params: {
          userID: window.localStorage.getItem('which.userToken'),
          resultLimit: 100
        }
      })
      .then(function(res) {
        return res.data;
      }, function(err) {
        return err;
      });
  };

  var getMostPopularWhiches = function(){
    return $http.get(serverURI + '/api/tag/mostPop', {
      params: {
          userID: window.localStorage.getItem('which.userToken'),
          resultLimit: 100
        }
      })
      .then(function(res){
        return res.data;
      }, function(err){
        return err;
      });
  };

  /*
   * Gets one which with the specified ID
   * Sends an HTTP get request to /api/which/{{id}}
   **/
  var getWhichByID = function(id) {
    return $http.get(serverURI + '/api/which/' + id)
      .then(function(res) {
        return res.data;
      }, function(err) {
        return err;
      });
  };

  /*
   * Gets all of the whiches created by a user
   * Sends an HTTP get request to /api/which?createdBy={{userid}}&resultLimit={{limit}}
   **/
  var getWhichesByUser = function() {
    return $http.get(serverURI + '/api/which',{
      params : {
        createdBy : window.localStorage.getItem('which.userToken'),
        resultLimit: 100
      }
    })
      .then(function(res) {
        return res.data;
      }, function(err) {
        return err;
      });
  };

  var deleteWhichById = function (id) {
    return $http.post(serverURI + '/api/which/delete/' + id)
      .then(function (res) {
        return res.data;
      }, function (err) {
        return err;
      });
  };

  /*
   * Generating random array value
   **/
  var getRandomWhich = function(array){
    return array[Math.floor(Math.random()*array.length)];
  };

  /*
   * gets array of all whiches in database, 
   * and then picks one based on randomizer
  **/
  var getNewWhich = function(){
    getNew().then(function(which) {

      if(which.length === 0){
        $state.go('app.tagView');
      } else {
        var randomWhich = getRandomWhich(which);
        randomWhich.imageURI = randomWhich.imageURI;
        $state.go('app.which', {
          id: randomWhich.id,
          question: randomWhich.question,
          thingA: randomWhich.thingA,
          thingB: randomWhich.thingB,
          imageURI: randomWhich.imageURI
          //tags: which.tags
        });
      }
    });
  };


  return {
    choose: choose,
    getNew: getNew,
    submit: submit,
    reporting: reporting,
    getWhichesByTag: getWhichesByTag,
    getWhichByID: getWhichByID,
    getWhichesByUser : getWhichesByUser,
    getMostPopularWhiches: getMostPopularWhiches,
    defaultImage: defaultImage,
    deleteWhichById: deleteWhichById,
    getNewWhich: getNewWhich
  };
});

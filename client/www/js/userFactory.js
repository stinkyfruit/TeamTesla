/**
 * Created by VaibhavNamburi on 10/01/2016.
 */
angular.module('user.factory',[])

.factory('User',function($http){

  var loggedIn = false;

  var apiUrl = 'http://localhost:5007'

  var login = function(credentials){
    $http.post(apiUrl + '/api/user/login', credentials).then(function(response){
      if(response.statusCode === 200)
      loggedIn = true
    })

  };

  var isloggedIn = function(){
    return loggedIn
  }

  return{
    isloggedIn : isloggedIn
  }

});

var User = require('./userModel.js'),
    bluebird = require('bluebird');


module.exports = {

  /*        Route Handler - POST /api/user/signup

        * Expects an object with the properties username
          and password
        * Responds with a 201 status code if successful,
          and 409 if the username already exists
  */
  createUser   : function(req, res, next){
    var user = {
      username: req.body.username,
      password: req.body.password
    };

    User.findOne(user)
      .then(function(dbResults){
        if (dbResults) res.sendStatus(409); // signup failed: user already exists
        else {
          var newUser = User(user);
          newUser.save(function(err){
            if (err) throw err;
            else res.sendStatus(201); // signup successful: created
          });
        }
      })
      .catch(function(err){
        throw err;
      });
  },


  /*        Route Handler - POST /api/user/login

        * Expects an object with the properties username
          and password
        * Responds with a 201 status code if successful,
          and 401 if the credentials are invalid
  */
  authenticate : function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username, password: password})
      .then(function(dbResults){
        if (!dbResults) res.sendStatus(401); // unauthorized: invalid credentials
        else res.sendStatus(200); // login successful
      })
      .catch(function(err){
        throw err;
      });
  }
};
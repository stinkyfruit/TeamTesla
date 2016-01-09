var User = require('./userModel.js'),
    Q    = require('q');


module.exports = {
  createUser   : function(req, res, next){
    var newUser = User({
      username: req.body.username,
      password: req.body.password
    });

    newUser.save(function(err){
      if (err) throw err;
      else res.send(200);
    });
  },
  authenticate : function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username, password: password})
      .exec(function(err, dbResults){
        console.log(dbResults);
        if (err) throw err;
        // else if (dbResults[0])
        else {
          res.json(dbResults);
        }
      });
  }
};
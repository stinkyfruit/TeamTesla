var express  = require('express'),
    mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');

var app = express();
var port = process.env.PORT || 5007;
var databaseLocation = 'mongodb://b:b@apollo.modulusmongo.net:27017/wymyrI3h';
// 'mongodb://localhost/testdb';


mongoose.connect(databaseLocation, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + databaseLocation + '. ' + err);
  }
  else {
  console.log ('Succeeded connected to: ' + databaseLocation);
  }
});

require('./middleware.js')(app, express);

app.listen(port, function(){
  console.log('Server now listening on port ' + port);
});

module.exports = {
  app: app,
  mongoose: mongoose
}

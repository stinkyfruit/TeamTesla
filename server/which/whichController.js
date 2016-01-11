var Which    = require('./whichModel.js'),
    bluebird = require('bluebird'),
    util     = require('../helpers/util.js');

var selectProperties = util.selectProperties;
var defaultWhichProps = util.defaultWhichProperties;

module.exports = {

  /* * * * * * * * * * * * GET HANDLERS * * * * * * * * * * * * * /

  /*        Route Handler - GET /api/which

        * Expects an username parameter in the query string.
          Optional query parameters:

             Parameter       Value         Description
               resultLimit     [number]      number of results to return. Default: 1
               createdBy       [username]

        * Default response is the oldest Which, not yet judged by the
          user. Optional query parameters change the results accordingly

  */
  getWhiches : function (req, res, next) {
    var username     =        req.query.username;
    var createdBy    =        req.query.createdBy;
    var resultLimit  = Number(req.query.resultLimit) || 1;

    var query = {};

    if (createdBy)  query.createdBy = createdBy;
    query.votesFrom = {$ne: username}; // exclude already judged Whiches

    Which.find(query)
      .sort({createdAt:1}) // oldest first
      .limit(resultLimit)
      .then(function(dbResults){
        res.json( defaultWhichProps(dbResults) );
      })
      .catch(function(err){
        throw err;
      });

  },


  /*        Route Handler - GET /api/which/:whichID

        * Expects no incoming data.
        * Responds with the Which specified by whichID
  */
  getWhichById : function (req, res, next) {
    var whichID  = req.body.whichID;

    Which.findOne({_id: whichID})
      .then(function(dbResults){
        res.json( defaultWhichProps(dbResults) );
      })
      .catch(function(err){
        throw err;
      });
  },


  /*        Route Handler - GET /api/tag/:tagName

        * Expects an username parameter in the query string.
        * Responds with an array of Whiches that contain
          tagName in their tags array
  */
  getWhichesByTag : function (req, res, next) {
    var tag = req.body.tagName;

    var username = req.query.username;
    var resultLimit  = Number(req.query.resultLimit) || 1;

    var query = {};
    query.votesFrom = {$ne: username}; // exclude already judged Whiches
    query.tags = tag;

    Which.find(query)
      .sort({createdAt:1}) // oldest first
      .then(function(dbResults){
        res.json( defaultWhichProps(dbResults) );
      })
      .catch(function(err){
        throw err;
      });
  },


  /*        Route Handler - GET /api/tag/:tagName/newest

        * Expects an username parameter in the query string.
          Optional query parameters:
            Parameter       Value         Description
              resultLimit     [number]      number of results to return. Default: 1
        * Responds with the most recently created Which whose
          tags array contains tagName
  */
  getNewestWhichByTag : function (req, res, next) {
    var tag = req.body.tagName;

    var username     =        req.query.username;
    var resultLimit  = Number(req.query.resultLimit) || 1;

    var query = {};
    query.votesFrom = {$ne: username}; // exclude already judged Whiches
    query.tags = tag;

    Which.find(query)
      .limit(resultLimit)
      .sort({createdAt:-1}) // newest first
      .then(function(dbResults){
        res.json( defaultWhichProps(dbResults) );
      })
      .catch(function(err){
        throw err;
      });
  },



  /* * * * * * * * * * * * POST HANDLERS * * * * * * * * * * * * * /

  /*        Route Handler - POST /api/which/

        * Expects a Which object with properties enumerated
          in newWhich below
        * Responds with a status code 201 and the newly created Which object
  */
  createWhich : function (req, res, next) {
    var data = req.body;

    var newWhich = {
      question: data.question,
      createdBy: data.createdBy, // username
      tags: data.tags,
      type : data.type,
      thingA : data.thingA, // either string of text, or url to resource
      thingB : data.thingB
    };

    Which(newWhich).save()
      .then(function(createdWhich){
        if (createdWhich) res.status(201).json( defaultWhichProps(createdWhich) );
      })
      .catch(function(err){
        throw err;
      });
  },


  /*        Route Handler - POST /api/which/:id/judge

        * Expects an object with the properties username
          and choice. Expects choice to be the string 'A' or 'B'
        * If successful, responds with JSON containing
          the current vote counts for both Which choices.
          Sends 409 if the ID is invalid, or the user already judged
  */
  judgeWhich : function (req, res, next) {
    var whichID  = req.body.whichID;
    var choice   = req.body.choice.toUpperCase();
    var username = req.body.username;

    // Find one Which by ID, but only if the user has not previously judged it
    var query = {_id: whichID, votesFrom: {$ne: username} };

    // If found, increment appropriate VoteCount property, and push user to votesFrom
    var updateCommand = { $inc: {}, $push: {votesFrom: username} };
    updateCommand.$inc['thing'+ choice + 'VoteCount'] = 1;

    Which.findOneAndUpdate(query, updateCommand, {new:true}) // include updated values in dbResults
      .then(function(dbResults){
        if (!dbResults) res.sendStatus(409) // invalid whichID or user already judged
        else {
          var clientResults = {
            votesForA: dbResults.thingAVoteCount,
            votesForB: dbResults.thingBVoteCount,
          }
          res.json(clientResults);
        }
      })
      .catch(function(err){
        throw err;
      });
  },


  /*        Route Handler - POST /api/which/:id/tag

        * Expects an object with a property tag.
          Expects tag to be a string that does not contain spaces.
        * Responds with a JSON object containing a tagNames
          property. tagNames is an array containing all tags
          the Which currently has
  */
  tagWhich : function (req, res, next) {
    var whichID  = req.body.whichID;
    var tag      = req.body.tag;

    var updateCommand = { $addToSet: {"tags": tag} }; // $addToSet will not add the value if it already exists

    Which.findByIdAndUpdate(whichID,updateCommand, {new:true}) // include updated values in dbResults
      .then(function(dbResults){
          var clientResults = {tagNames: dbResults.tags};
          res.json(clientResults);
      })
      .catch(function(err){
        throw err;
      });
  },
};

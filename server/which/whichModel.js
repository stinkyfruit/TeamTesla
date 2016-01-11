var mongoose = require('mongoose');

var WhichSchema = new mongoose.Schema({
  // _id:    mongo creates this
  question: {type: String, default: ''},
  createdBy: {type: String, default: 'Anonymous'}, // username
  votesFrom: Array,
  tags: Array,
  type : {type: String, default: 'text'},
  thingA : {type: String, default: ''}, // either string of text, or url to resource
  thingB : {type: String, default: ''},
  thingAVoteCount : {type: Number, default: 0},
  thingBVoteCount : {type: Number, default: 0},
  // lastVotedOn : { type: Date, default: Date.now },
  createdAt : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Which', WhichSchema);
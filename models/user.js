var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var User = new Schema({

  login: {
    type    : String,
    require : true
  },
  password: {
    type    : String,
    require : true
  },
  modified: {
    type    : Date,
    default : Date.now
  },
  created_at: {
    type    : Date
  }
});

module.exports = mongoose.model('User', User);
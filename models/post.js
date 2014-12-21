var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Post = new Schema({

  title:    {
    type    : String,
    require : true
  },
  pretty_url:{
    type    : String,
    require : true
  },
  body:    {
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

module.exports = mongoose.model('Post', Post);
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');
var _ = require('underscore');

var mongoose = require("mongoose");

// MongoDB config
mongoose.connect(process.env.MONGO_CREDS, function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
// app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res) {
  res.render("layout");
});


require('./routes/posts')(app);

// var postRoutes = require('./routes/posts');
// app.use('/posts', postRoutes);

// how to use this with multiple routes

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('shh, im working over here...')
});
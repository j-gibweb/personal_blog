var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');
var _ = require('underscore');


app.set('view engine', 'ejs');
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req, res) {
  res.render("index");
});


require('./routes/posts')(app);
// routes = require('./routes/posts')(app);

// var postRoutes = require('./routes/posts');
// app.use('/posts', postRoutes);

// how to use this with multiple routes


app.listen(3000, function() {
  console.log('shh, im working over here...')
});
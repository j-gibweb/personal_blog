var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.urlencoded({extended:false}));

// app.get('/', function(req, res) {
//   res.render("index");
// });

// var postRoutes = require('./routes/posts');
// app.use('/posts', postRoutes);

// how to use this with multiple routes
routes = require('./routes/posts')(app);

app.listen(3000, function() {
  console.log('shh, im working over here...')
});
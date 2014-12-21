var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

var mongoose = require("mongoose");
require('./db');
// MongoDB config
mongoose.connect(process.env.MONGO_CREDS, function(err, res) {
  if(err) {
    console.log('error connecting to MongoDB Database. ' + err);
  } else {
    console.log('Connected to Database');
  }
});
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));

app.use(bodyParser.urlencoded({extended:false}));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey', cookie: { maxAge : 3600000 }}));
app.use(passport.initialize());
app.use(passport.session());

var flash = require('connect-flash');
app.use(flash());

var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/users')(passport);
app.use('/', routes);

app.get('/', function(req, res) {
  if (req.isAuthenticated()) {
    console.log(req.session)
  } else {
    console.log(req.isAuthenticated())
  }
  res.render("layout");
});

// require('./routes/users')(app);
require('./routes/posts')(app);

// var postRoutes = require('./routes/posts');
// app.use('/posts', postRoutes);

// how to use this with multiple routes

var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('shh, im working over here...')
});
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

// CRITICAL for file uploads
// gives request a 'files' property {}
var multer  = require('multer');
app.use(multer({ dest: './uploads/'}))



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



var flash = require('connect-flash');
app.use(flash());

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey', cookie: { maxAge : 3600000 }}));
app.use(passport.initialize());
app.use(passport.session());

var initPassport = require('./passport/init');
initPassport(passport);
var routes = require('./routes/users')(passport);
app.use('/', routes);

app.get('/', function(req, res) {
  res.render("layout", {passport: req.session.passport});
});

require('./routes/posts')(app);
// var postRoutes = require('./routes/posts');
// app.use('/posts', postRoutes);
require('./routes/uploads')(app);



var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/public/images/favicon.ico'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('shh, im working over here...')
});
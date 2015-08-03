var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/');
}

module.exports = function(passport){

  // router.get('/', function(req, res) {
  //   res.render('layout', { message: req.flash('message') });
  // });

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash : true  
  }));


  router.get('/login', function(req, res){
    res.render('register',{message: req.flash('message')});
  });

  // router.post('/signup', passport.authenticate('signup', {
  //   successRedirect: '/home',
  //   failureRedirect: '/signup',
  //   failureFlash : true  
  // }));

  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}


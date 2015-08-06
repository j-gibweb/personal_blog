var express = require('express');
var router = express.Router();
var _ = require('underscore');

var jwtSecret = require('../secret').jwtSecret
var jwt = require('jsonwebtoken');


function createToken(user) {
  return jwt.sign(
    user, jwtSecret, { expiresInMinutes: 60*5 }
    );
}


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

  router.post('/login', 
    passport.authenticate('login', {
      successRedirect: '/login-success',
      failureRedirect: '/login',
      failureFlash : true  
    })
  );

  router.get('/login-success', function(req, res) {
    res.send(req.session);
    // res.status(201).send({
    //   token: createToken(req.session.user)
    // });
  });

  // router.post('/login', 
  //   function(req, res, next) {
  //     passport.authenticate('login', 
  //     function(err, user, info) {
  //       var resp = {};
  //       resp.username = user.username;
  //       resp._id = user._id;
  //       // whyyy doesn't _.omit work? 
  //       // -> because this is not a normal object coming back from passport?

  //       // req.session.passport['user'] = resp;
  //       res.send(req.session)
  //       // res.status(201).send({
  //       //   token: createToken(resp)
  //       // });
  //     })(req, res, next)
  //   }
  // );
  

  // router.get('/login', function(req, res){
  //   res.render('register', {message: req.flash('message')});
  // });

  // router.post('/signup', passport.authenticate('signup', {
  //   successRedirect: '/home',
  //   failureRedirect: '/signup',
  //   failureFlash : true  
  // }));

  // router.get('/signout', function(req, res) {
  //   req.logout();
  //   res.redirect('/');
  // });

  return router;
}


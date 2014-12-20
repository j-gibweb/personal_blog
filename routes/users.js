var User = require('../models/user.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));  


module.exports = function(app) {

  authUser = function(req, res) {

      
  }


  addUser = function(req, res) {

    var user = new User({
      login: req.body.login,
      password: req.body.password,
      created_at: Date.now()
    });

    user.save(function(err) {

      if(err) {

        console.log('Error while saving user: ' + err);
        res.send({ error:err });
        return;

      } else {

        console.log("User created");
        return res.send({ status: 'OK', user:user });

      }

    });
  };

  
  app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login',
                                     failureFlash: true })
  );
  app.post('/users', addUser);
}




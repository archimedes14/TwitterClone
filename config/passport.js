var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; 
var User = require('../models/user');

module.exports = function(passport, LocalStrategy) {
	passport.serializeUser(function(user, done) {
 		 done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
  		User.findById(id, function(err, user) {
  		  done(err, user);
  		});
	});

	passport.use('local', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done) {	
	User.findOne({email:username}, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, {message: 'Incorrect username'});
		}
			
		if (!user.validPassword(password)) {
			return done(null, false, {message: 'Incorrect password'});
		}
		
		return done(null, user);
	});
	}));
}


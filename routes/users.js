var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
var User = require('../models/user');
var passport = require('passport');



db.on('error', console.error.bind(console, 'connection:error:'));

db.once('open', function(callback) {
	console.log("Connected to MongoDB");
}); 


/* Save user if he doesn't already exist */
router.post('/signup', function(req, res, next) {
  var newEmail = req.body.email;
  var newPassword = req.body.password;
  User.find({email:newEmail},function(err, users) {
  	if (err)
  		return res.send(err);
  	else {
  		if (users.length === 0) {
  			var newUser = new User({email:newEmail, password:newPassword}); 
  			newUser.save(function(err, newUser) {
  				if (err)
  					res.send(err);
  				else {
  					res.send(newUser.email+" is created");
  				}
  			});
  		}
  	}
  });

});
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'Express'});
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express'});
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
res.redirect('/twitter');
});


router.get('/all', function(req, res, next) {
	User.find(function(err,users) {
		if (err)
			res.send(err);
		else 
			res.send(users);
	});
});

module.exports = router;

var express = require('express');
var router = express.Router();
var models = require('../models');
var Tweet = models.Tweet;


router.get('/all', function(req, res) {
	Tweet.findAll().then(function(callback) {
		var str = []; 
		for (var i in callback) {
			var temp = {}; 
			temp.content = callback[i].content;
			temp.createdAt = callback[i].createdAt; 
			str.push(temp); 
		}
		res.send(str);
	});
});

router.post('/save', function(req, res) {
	

	var newTweet = req.body.newTweet; 

	var myTweet = Tweet.build({content:newTweet});
	myTweet.save().then(function() {
		res.send("1");
	});
}); 
	

module.exports = router;

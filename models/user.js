var mongoose = require('mongoose');

//USER MODEL SCHEMA AND MODEL 
var userSchema = mongoose.Schema({
	email: String,
	password: String
});

userSchema.methods.validPassword = function(password) {
	return password==="12345"; 
}

var User = mongoose.model('User', userSchema);

module.exports = User; 

var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');


//USER MODEL SCHEMA AND MODEL 
var userSchema = mongoose.Schema({
	email: String,
	password: String
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User; 

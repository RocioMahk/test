//app/models/user.js
//load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

//define the schema for our user model
var Schema = mongoose.Schema;
var userSchema = new Schema({

	local			: {
		email		: String,
		password	: String
	},
	
	slug: String,
	nombre: String,
    token: String,
    creado: { type: Date, default: Date.now },
    modificado: { type: Date, default: Date.now },
    primeravez: Boolean
});

// methods ==========
// generating a hash

userSchema.methods.generateHash =  function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// cheking if password is valid
userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.local.password);
};

//create the model for users and expose it to our app
module.exports = mongoose.model('Usuario', userSchema);
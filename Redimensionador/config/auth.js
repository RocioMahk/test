//expose our configuration directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID': '1027871424017894', 
		'clientSecret': '07b28004a49bae13fa5be3c234727ced', 
		'callbackURL': 'http://localhost:8080/auth/facebook/callback',
		'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
		'profileFields': ['id', 'email', 'name']  
	}

};
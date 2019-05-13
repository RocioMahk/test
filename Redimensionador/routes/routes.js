var multer = require('multer');
var nodemailer   = require('nodemailer');
var uploadAvatar = multer({ dest: './public/images/users/' });
var uploadImage = multer({ dest: './public/images/publicaciones/' });

// Apartado para "ADMIN"
//======================

getAdmin 		= require('./admin/admin.js');
getAdminLogin	= require('./admin/adminlogin.js');

getAdminUsuarios = require('./admin/adminusuarios.js');
getAdminUsuario = require('./admin/adminusuario.js');
getPerfilUsuario = require('./perfil/perfilusuario.js');

getAdminPublicaciones = require('./admin/adminpublicaciones.js');
getAdminPublicacion = require('./admin/adminpublicacion.js');
getPerfilPublicacion = require('./perfil/perfilpublicacion.js');

setDatosPublicaciones = require('./admin/publicaciones/datospublicaciones.js');
setDatosPublicacionesP = require('./perfil/publicaciones/datospublicaciones.js');
setDatosUsuarios = require('./admin/usuarios/datosusuarios.js');
setDatosUsuariosP = require('./perfil/usuarios/datosusuarios.js');

postGuardarUsuario = require('./admin/api/guardarUsuario.js');
postGuardarUsuarioP = require('./perfil/api/guardarUsuario.js');
postGuardarPublicacion = require('./admin/api/guardarPublicacion.js');
postGuardarPublicacionP = require('./perfil/api/guardarPublicacion.js');
//==========================

//app/routes.js
module.exports = function(app,passport){

	//HOME PAGE con links de loggeo
	app.get('/', function(req, res){
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	//LOGIN

	//form del login
	app.get('/login', function(req, res){
		//render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });

	});


/*====================================
==========SECCION DEL ADMIN
===========================*/

app.get('/admin/', getAdmin);
app.get('/admin/login', getAdminLogin);
app.post('/admin/login', passport.authenticate('local-login-admin', {
        successRedirect : '/admin/usuarios', 
        failureRedirect : '/login', 
        failureFlash : true 
    }));


app.get('/admin/publicaciones', isLoggedIn, getAdminPublicaciones);
app.get('/admin/publicacion/:titulo', isLoggedIn, getAdminPublicacion);
app.get('/perfil/publicacion/:titulo', isLoggedIn, getPerfilPublicacion);

app.get('/admin/usuarios', isLoggedIn, getAdminUsuarios);
app.get('/admin/usuario/:mail', isLoggedIn, getAdminUsuario);
app.get('/perfil/usuario/:mail', isLoggedIn, getPerfilUsuario);

app.get('/admin/publicaciones/crear', isLoggedIn, setDatosPublicaciones);
app.get('/admin/usuarios/crear', isLoggedIn, setDatosUsuarios);

app.post('/admin/api/guardarUsuario', isLoggedIn, postGuardarUsuario);
app.post('/perfil/api/guardarUsuario', isLoggedIn, postGuardarUsuarioP);
app.post('/admin/api/guardarPublicacion', isLoggedIn, postGuardarPublicacion);
app.post('/perfil/api/guardarPublicacion', isLoggedIn, postGuardarPublicacionP);


	// ============= PROFILE SECTION ==============
	//we will use route middleware to verify this (the isLoggedIn function)

	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

	app.get('/resizeinator', isLoggedIn, function(req, res) {
		res.render('resizeinator.ejs', {
			user : req.user
		});
	});

	// ===========.LOGOUT ==========
	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	// SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });
	//process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', 
		failureRedirect : '/signup', 
		failureFlash : true 
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/profile', 
		failureRedirect : '/login', 
		failureFlash : true 
	}));


};


function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/login');
}


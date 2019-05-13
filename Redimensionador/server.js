//todas las herramientas a ecesitar para...

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// configuracion ==============================
mongoose.connect(configDB.url); //connect to our database

require('./config/passport')(passport);	//configuracion del passport

//app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));

app.use(morgan('dev'));
app.use(cookieParser());	//para los cookies
app.use(bodyParser());		//obtener informacion de los forms html GET

app.set('view engine', 'ejs');	//set up ejs for templating

//required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session()); //sessiones de registro persistentes
app.use(flash());	//usa coneccion flash mensajes almacenados en sesion

//routes ===============================
require('./routes/routes.js')(app, passport);

//launch ==============================
app.listen(port);
console.log('The magic happens on port ' + port);

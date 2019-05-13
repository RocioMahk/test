//login.js view
var async = require('async');
var _ = require('lodash');
var mongoose = require('mongoose');
var Publicacion     = require('../../../models/publicacion');

module.exports = function(req, res)
{

	console.log('== ver req session datospublicaciones.js ==');
    console.log(req.session);
    console.log('== ver req user datospublicaciones.js ==');
    console.log(req.user);

    locals = res.locals;
    locals.data = {};
    locals.data.header = {};

    if (!_.isUndefined(req.user))
        locals.data.header.nombre = req.user.nombre;
    if (!_.isUndefined(req.session.passport))
        if (!_.isEmpty(req.session.passport))
            locals.data.header.haySesion = true;
        else
            locals.data.header.haySesion = false;
    else
        locals.data.header.haySesion = false;

    Publicacion.find({}).sort({'publicado': -1}).exec(function(err, publicaciones){
        // acciones que procesar

        //----------------------
        console.log(publicaciones);
        locals.data.publicaciones = publicaciones;
        res.render('datosPublicaciones', { message: req.flash('loginMessage') });
    });

	// render the page and pass in any flash data if it exists
	//res.render('adminJuegos', { message: req.flash('loginMessage') });

}


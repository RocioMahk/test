//login.js view
var async = require('async');
var _ = require('lodash');
var mongoose = require('mongoose');
var Usuario     = require('../../../models/usuario');

module.exports = function(req, res)
{

	console.log('== ver req session ==');
    console.log(req.session);
    console.log('== ver req user eres tu?==');
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

    Usuario.find({}).sort({'publicado': -1}).exec(function(err, usuarios){
        // acciones que procesar

        //----------------------
        console.log(usuarios);
        locals.data.usuarios = usuarios;
        res.render('datosUsuarios', { message: req.flash('loginMessage') });
    });

	// render the page and pass in any flash data if it exists

}
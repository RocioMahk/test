//login.js view
var async = require('async');
var _ = require('lodash');
var mongoose = require('mongoose');
var Publicacion    = require('../../models/publicacion');

module.exports = function(req, res)
{


    console.log('== ver req params adminpublicacion.js ==');
    console.log(req.params);

    locals = res.locals;
    locals.data = {};
    locals.data.header = {};

    if (!_.isUndefined(req.publicacion))
        locals.data.header.titulo = req.publicacion.titulo;
    if (!_.isUndefined(req.session.passport))
        if (!_.isEmpty(req.session.passport))
            locals.data.header.haySesion = true;
        else
            locals.data.header.haySesion = false;
    else
        locals.data.header.haySesion = false;

    Publicacion.findOne({'titulo': req.params.titulo}).exec(function(err, publicacion){
        // acciones que procesar

        //----------------------
        console.log(publicacion);
        locals.data.publicacion = publicacion;
        res.render('datosPublicaciones', { message: req.flash('loginMessage') });
    });

    // render the page and pass in any flash data if it exists
    //res.render('adminJuegos', { message: req.flash('loginMessage') });

}
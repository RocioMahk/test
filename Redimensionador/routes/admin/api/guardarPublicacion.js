//login.js view
var async = require('async');
var _ = require('lodash');
var mongoose = require('mongoose');
var Publicacion     = require('../../../models/publicacion');

module.exports = function(req, res)
{

    console.log('== ver req body guardarPublicacion.js ==');
    console.log(req.body);
    formData = req.body;

    if (_.isUndefined(req.body.id))
    {
        // es un registro nuevo (crear)
        newPublicacion = new Publicacion();
                    
                    newPublicacion.titulo = formData.titulo;
                   
                    newPublicacion.contenido = formData.contenido;
                    newPublicacion.primeravez = formData.primeravez;

                    newPublicacion.save(function(err) {
                        if (err)
                            throw err;
                        return res.json(newPublicacion);
                    });

    }
    else
    {

        // es un registro existente (buscar)
        Publicacion.findOne({ '_id': formData.id }, function (err, publicacion) {
                if (err) return handleError(err);

            publicacion.titulo = formData.titulo;
            publicacion.contenido = formData.contenido;
            publicacion.modificado = new Date();

            //save the user
            publicacion.save(function(err){
                if(err)
                    throw err;
                else
                {
                    if(!_.isUndefined(publicacion)) return res.json(publicacion);
                        return res.end("false");
                }
            });
        });
    }
    //return res.end('false');
}
//login.js view
var async = require('async');
var _ = require('lodash');
var mongoose = require('mongoose');
var User     = require('../../../models/usuario');

module.exports = function(req, res)
{

    console.log('== ver req body ==');
    console.log(req.body);

    formData = req.body;

    respuesta = {};

    if (_.isUndefined(req.body.id))
    {
        // es un registro nuevo (crear)
        newUser = new User();

                    newUser.local.email = formData.email.trim();
                    newUser.local.password = newUser.generateHash(formData.pass);
                    newUser.nombre = formData.nombre;
                    newUser.primeravez=formData.primeravez;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        respuesta.estado = 'ok';
                        respuesta.elem = newUser;
                        return res.json(respuesta);
                    });

    }
    else
    {

        // es un registro existente (buscar)
        User.findOne({ '_id': formData.id }, function (err, user) {
                if (err) return handleError(err);

            user.local.email = formData.email.trim();
            if (formData.pass != '')
                user.local.password = user.generateHash(formData.pass);
            user.nombre = formData.nombre;
            user.modificado = new Date();

            user.save(function(err){
                if(err)
                    throw err;
                else
                {
                    respuesta.estado = 'ok';
                    respuesta.elem = user;
                    if(!_.isUndefined(user)) return res.json(respuesta);
                        return res.end("false");
                }
            });
        });
    }
    //return res.end('false');
}
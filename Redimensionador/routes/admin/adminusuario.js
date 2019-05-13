//login.js view
var async = require('async');
var _ = require('lodash');
var mongoose = require('mongoose');
var Usuario    = require('../../models/usuario');

function parseDate(datestr)
{
    console.log(datestr);
    datestr = String(datestr);
    mes = datestr.substr(4, 3);
    switch (mes)
    {
        /*case 'Jan': mes = 'Ene'; break;
        case 'Apr': mes = 'Abr'; break;
        case 'Aug': mes = 'Ago'; break;
        case 'Dec': mes = 'Dic'; break;*/
        case 'Jan': mes = '01'; break;
        case 'Feb': mes = '02'; break;
        case 'Mar': mes = '03'; break;
        case 'Apr': mes = '04'; break;
        case 'May': mes = '05'; break;
        case 'Jun': mes = '06'; break;
        case 'Jul': mes = '07'; break;
        case 'Aug': mes = '08'; break;
        case 'Sep': mes = '09'; break;
        case 'Oct': mes = '10'; break;
        case 'Nov': mes = '11'; break;
        case 'Dec': mes = '12'; break;
    }
    dia = datestr.substr(8, 2);
    anio = datestr.substr(11, 4);
    parsedDate = mes+'/'+dia+'/'+anio;
    return parsedDate;
}

module.exports = function(req, res)
{

	//console.log('== ver req session ==');
    //console.log(req.session);
    //console.log('== ver req user ==');
    //console.log(req.user);
    console.log('== ver req params adminusuario.js  ==');
    console.log(req.params);

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

    Usuario.findOne({'local.email': req.params.mail}).exec(function(err, usuario){
        console.log(usuario);
        usuario.parsedDate = parseDate(usuario.fechaNac);
        locals.data.usuario = usuario;
        res.render('datosUsuarios', { message: req.flash('loginMessage') });
    });

	// render the page and pass in any flash data if it exists
	//res.render('adminJuegos', { message: req.flash('loginMessage') });

}
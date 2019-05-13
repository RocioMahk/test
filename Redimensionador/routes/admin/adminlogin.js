//login.js view
var async = require('async');
var _ = require('lodash');

module.exports = function(req, res)
{

	console.log('== ver req session ==');
    console.log(req.session);
    console.log('== ver req user ==');
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

	// render the page and pass in any flash data if it exists
	res.render('adminLogin', { message: req.flash('loginMessage') });

}
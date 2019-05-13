//login.js view
var async = require('async');
var _ = require('lodash');

module.exports = function(req, res)
{

	console.log('== ver req session ==');
    console.log(req.session);
    console.log('== ver req user ==');
    console.log(req.user);

    if (!_.isUndefined(req.user))
    {
        res.redirect('/admin/usuarios');
    }
    else
    {
        res.redirect('/login');
    }
	// render the page and pass in any flash data if it exists
	//res.render('admin', { message: req.flash('loginMessage') });

}
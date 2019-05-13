// Modelo PUBLISH

// app/models/publicacion.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var URLSlugs = require('mongoose-url-slugs');

var Schema       = mongoose.Schema;

var publicacionSchema   = new Schema({
    titulo: String,
    contenido: String,
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    imgs: String,
    estado: String, //original, retoque
    
});

publicacionSchema.plugin(URLSlugs('titulo', {update: true}));

module.exports = mongoose.model('Publicacion', publicacionSchema);



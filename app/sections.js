var mongoose = require('mongoose');
var Cosa = mongoose.model('Cosa');

// Pagina de inicio
exports.index = function(req, res) {
    res.render("index", {
        titulo: "Inicio"
    });
};

// Pagina de crear
exports.create_get = function(req, res) {
    res.render("create", {
        titulo: "Crear"
    });
};

// Acción de crear
exports.create_post = function(req, res) {
    new Cosa({
        nombre: req.body.nombre,
        contenido: req.body.contenido,
        fecha: Date.now()
    }).save(function(err, cosa, count) {
        if (err) return next(err);

        res.redirect('/');
    });
};

// Página de leer
exports.read = function(req, res) {
    Cosa.
    find().
    sort('-fecha').
    exec(function(err, cosas) {
        if (err) return next(err);

        res.render('read', {
            title: "Listar",
            cosas: cosas
        });
    });
};

// Devuelve el listado en JSON
exports.json = function(req, res) {
    Cosa.
    find().
    sort('-fecha').
    exec(function(err, cosas) {
        if (err) return next(err);

        return res.end(JSON.stringify(cosas));
    });
};
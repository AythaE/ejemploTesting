"use strict";

var mongoose = require("mongoose");
var Cosa = mongoose.model("Cosa");

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
	}).save(function(err) {
		if (err) {
			res.status(err.status);
			res.render("error", {
				mensaje: err.message,
			});
		}

		res.redirect("/");
	});
};

// Página de leer
exports.read = function(req, res) {
	Cosa.
	find().
	sort("-fecha").
	exec(function(err, cosas) {
		if (err) {
			res.status(err.status);
			res.render("error", {
				mensaje: err.message,
			});
		}

		res.render("read", {
			title: "Listar",
			cosas: cosas
		});
	});
};

// Acción de actualizar
exports.update = function(req, res) {
	Cosa.findById(req.params.id, function(err, cosa) {
		cosa.fecha = Date.now();
		cosa.save(function(err) {
			if (err) {
				res.status(err.status);
				res.render("error", {
					mensaje: err.message,
				});
			}

			res.redirect("/json");
		});
	});
};

// Acción de borrar
exports.delete = function(req, res) {
	Cosa.findById(req.params.id, function(err, cosa) {

		cosa.remove(function(err) {
			if (err) {
				res.status(err.status);
				res.render("error", {
					mensaje: err.message,
				});
			}

			res.redirect("/json");
		});
	});
};

// Devuelve el listado en JSON
exports.json = function(req, res) {
	Cosa.
	find().
	sort("-fecha").
	exec(function(err, cosas) {
		if (err) {
			res.status(err.status);
			res.render("error", {
				mensaje: err.message,
			});
		}

		return res.end(JSON.stringify(cosas));
	});
};
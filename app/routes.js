"use strict";

var sections = require("./sections");

module.exports = function(app) {
	// Rutas de acceso
	app.get("/", sections.index);
	app.get("/create", sections.create_get);
	app.post("/create", sections.create_post);
	app.get("/read", sections.read);
	app.get("/update/:id", sections.update);
	app.get("/delete/:id", sections.delete);
	app.get("/json", sections.json);

	// Captura errores
	app.use(function(req, res, next) {
		var err = new Error("Error: página no encontrada.");
		err.status = 404;
		next(err);
	});

	// Manejador de errores:
	app.use(function(err, req, res) {
		res.status(err.status);
		res.render("error", {
			mensaje: err.message,
		});
	});
};
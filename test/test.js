"use strict";

process.env.NODE_ENV = "test";

require("../app/model");

var mongoose = require("mongoose");
var Cosa = mongoose.model("Cosa");

var app = require("../app.js");

var expect = require("chai").expect;
var assert = require("chai").assert;

var should = require("should");

var request = require("supertest");

describe("Prueba de acceso", function() {
	it("Inicio", function(done) {
		request(app)
			.get("/")
			.expect("Content-Type", /text\/html/)
			.expect(200, done);
	});

	it("Crear [GET]", function(done) {
		request(app)
			.get("/create")
			.expect("Content-Type", /text\/html/)
			.expect(200, done);
	});

	it("Crear [POST]", function(done) {
		request(app)
			.post("/create")
			.send({
				"nombre": "prueba",
				"contenido": "prueba"
			})
			.expect("Content-Type", /text\/plain/)
			.expect(302, done);
	});

	it("Verificar valor de una cosa [chai]", function(done) {
		Cosa.
		findOne({
			"nombre": "prueba"
		}).
		exec(function(err, cosa) {
			if (err) {
				res.json({
					status: false,
					error: "No se ha podido realizar la acción de actualizar."
				});
			}

			assert.equal(cosa.contenido, "prueba");
			done();
		});
	});

	it("Verificar valor de una cosa [should]", function(done) {
		Cosa.
		findOne({
			"nombre": "prueba"
		}).
		exec(function(err, cosa) {
			if (err) {
				res.json({
					status: false,
					error: "No se ha podido realizar la acción de actualizar."
				});
			}

			cosa.contenido.should.be.equal("prueba");
			done();
		});
	});

	it("Listar todo", function(done) {
		request(app)
			.get("/read")
			.expect("Content-Type", /text\/html/)
			.expect(200, done);
	});

	it("Actualizar", function(done) {
		Cosa.
		findOne({
			"nombre": "prueba"
		}).
		exec(function(err, cosa) {
			if (err) {
				res.json({
					status: false,
					error: "No se ha podido realizar la acción de actualizar."
				});
			}

			request(app)
				.get("/update/" + cosa._id)
				.expect("Content-Type", /text\/plain/)
				.expect(302, done);
		});
	});

	it("Borrar", function(done) {
		Cosa.
		findOne({
			"nombre": "prueba"
		}).
		exec(function(err, cosa) {
			if (err) {
				res.json({
					status: false,
					error: "No se ha podido realizar la acción de borrar."
				});
			}

			request(app)
				.get("/delete/" + cosa._id)
				.expect("Content-Type", /text\/plain/)
				.expect(302, done);
		});
	});

	it("JSON", function(done) {
		request(app)
			.get("/json")
			.expect("Content-Type", /application\/json/)
			.expect(200, done);
	});

	it("404", function(done) {
		request(app)
			.get("/foo")
			.expect(404, done);
	});
});
"use strict";

require("../app/model");

var mongoose = require("mongoose");
var Cosa = mongoose.model("Cosa");

var app = require('../app.js');

var expect = require('chai').expect;
var request = require("supertest");

// Prueba de acceso a la página
describe('Prueba de acceso', function() {
    it("Inicio", function(done) {
        request(app)
            .get("/")
            .expect("Content-Type", /text\/html/)
            .expect(200, done);
    });

    it("Crear", function(done) {
        request(app)
            .get("/create")
            .expect("Content-Type", /text\/html/)
            .expect(200, done);
    });

    it("Listar", function(done) {
        request(app)
            .get("/read")
            .expect("Content-Type", /text\/html/)
            .expect(200, done);
    });

    it("JSON", function(done) {
        request(app)
            .get("/json")
            .expect("Content-Type", /application\/json/)
            .expect(200, done);
    });

    it("404 page", function(done) {
        request(app)
            .get("/foo")
            .expect(404, done);
    });
});

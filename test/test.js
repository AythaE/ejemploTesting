"use strict";

var assert = require("assert");
var request = require("supertest");
var should = require("should");

var app = require('../app.js');

// Prueba de acceso a la página
describe('Prueba de acceso', function() {
    it("Página principal", function(done) {
        request(app)
            .get("/")
            .expect("Content-Type", /text\/html/)
            .expect(200, done);
    });
});

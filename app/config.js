// Inicializa mongoose
require('./db');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var engine = require('ejs-locals');
var favicon = require('serve-favicon');
var http = require('http');
var logger = require('morgan');
var methodOverride = require('method-override');
var path = require('path');

var express = require("express");

module.exports = function(app) {
    // Dirección IP y puerto de escucha de peticiones
    app.set("port", process.env.PORT || 3000);
    app.set("ip", process.env.IP || "0.0.0.0");

    // Directorio con las plantillas
    app.set("views", "views");
    // Motor de visualización
    app.set("view engine", "ejs");

    // Favicon
    app.use(favicon("./public/favicon/favicon.ico"));
    // Logger de solicitudes HTTP
    app.use(logger("dev"));

    // Parseadores
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(methodOverride());
    app.use(cookieParser());

    //Manejador de enrutado
    app.use(express.static("./public"));
};

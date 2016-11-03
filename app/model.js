var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Cosa = new Schema({
	nombre: String,
	contenido: String,
	fecha: Date
});

mongoose.model("Cosa", Cosa);
mongoose.connect("mongodb://germaaan:germaaan@ds050189.mlab.com:50189/prueba");
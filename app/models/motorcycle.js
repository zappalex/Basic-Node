
var mongoose 	= require('mongoose'); 
var Schema 		= mongoose.Schema; 

var MotoSchema = new Schema({
	make : String, 
	model : String, 
	year : Number, 
	mileage : Number
}); 

module.exports = mongoose.model('Motorcycle', MotoSchema);

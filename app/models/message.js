var mongoose	= require('mongoose'); 
var Schema 		= mongoose.Schema; 

var MessageSchema = new Schema({
	user: String,
	body: String,
	date: Date
}); 

module.exports = mongoose.model('Message', MessageSchema); 
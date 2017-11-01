// call the packages we need 
var express 	= require('express'); 
var app 		= express(); 
var bodyParser 	= require('body-parser'); 
var mongoose 	= require('mongoose');  

// TODO: create db, create messages object. 
mongoose.connect("mongodb://localhost/Message"); 
var Message		= require("./app/models/message"); 

app.use(bodyParser.urlencoded({extended:true})); 
app.use(bodyParser.json()); 

var port = process.env.PORT || 8080; 


// ROUTES =======================================
var router = express.Router(); 

// middleware
router.use(function(req, res, next){
	console.log("middleware called for request, moving on now..."); 
	next(); 
})

// -------- routes that end in /api --------
router.get('/', function(req, res){
	res.json({message: 'welcome to the messages api'});
});


// -------- routes that end in /messages
router.route('/messages')

.post(function(req, res){
	var message = new Message(); 
	message.user = req.body.user; 
	message.body = req.body.body;
	message.date =  new Date(); 
	
	message.save(function(err){
		if(err)
			res.send(err); 

		res.json({message: "message successfully created. "}); 
	}); 
})

.get(function(req, res){
	Message.find(function(err, messages){
		if(err)
			res.send(err); 

		res.json({messages: messages}); 
	});
});


//REGISTER ROUTES =======================================
app.use('/api', router); 


//START THE SERVER =======================================
app.listen(port); 
console.log("Messages server now running on port " + port); 
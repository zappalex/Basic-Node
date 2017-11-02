//BASE SETUP =======================================


// call the packages we need 
var express 	= require('express'); 
var app 		= express(); 
var bodyParser 	= require('body-parser'); 
var mongoose 	= require('mongoose'); 

// local mongo db location. When hit, a collection named "motorcycle" will automatically be created in the "Motorcycle" db. 
mongoose.connect("mongodb://localhost/Motorcycle"); 
var Motorcycle = require("./app/models/motorcycle")

//configure bodyParser, this will let us get data from a POST
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); 

var port = process.env.PORT || 8080; 


//ROUTES FOR OUR API =======================================
var router = express.Router(); 

//middleware to use for all requests.  can be used for validation, 
//errors, extra logging, etc. 
router.use(function(req, res, next){
	// do logging 
	console.log('Something is happening'); 
	// next allows us to go to next route and not stop here. 
	next(); 
})


// -------- routes that end in /api --------
router.get('/', function(req, res){
	res.json({message: 'welcome to the motorcycles api.'});
});


// -------- routes that end in /motorcycles --------
// create a motorcycle, get all motorcycles here. 
router.route('/motorcycles')

.post(function(req, res){
	var motorcycle = new Motorcycle(); 

	motorcycle.make = req.body.make; 
	motorcycle.model = req.body.model; 
	motorcycle.year = req.body.year; 
	motorcycle.mileage = req.body.mileage; 

	motorcycle.save(function(err){
		if(err)
			res.send(err); 

		res.json({message: motorcycle.make + " " + motorcycle.model + " was just created."}); 
	}); 
}) // remember: no ';' here, they are linked.  fool. 

.get(function(req, res){
	Motorcycle.find(function(err, motorcycle){
		if(err)
			res.send(err); 

		res.json(motorcycle); 
	}); 
}); 


// ------ routes that end in /motorcycles/:motorcycle_id --------
// get a single motorcycle / update a single motorcycle / delete a motorcycle. 
router.route('/motorcycle/:motorcycle_id')

// get a single bear by id
.get(function(req, res){
	Motorcycle.findById(req.params.motorcycle_id, function(err, motorcycle){
		if(err)
			res.send(err); 

		res.json(motorcycle); 
	}); 
})

// update a motorcycle by id
.put(function(req, res){
	Motorcycle.findById(req.params.motorcycle_id, function(err, motorcycle){
		if(err)
			res.send(err); 

		motorcycle.make = req.body.make; 

		motorcycle.save(function(err){
			if(err)
				res.send(err); 

			res.json({ message: "Motorcycle updated!"}); 
		});
	});
})

// delete a motorcycle by id
.delete(function(req, res){

	 Motorcycle.remove({
		 _id: req.params.motorcycle_id
	}, function(err, motorcycle){
		if(err)
			res.send(err); 

		res.json({ message: 'Motorcycle successfully deleted :('}); 
	}); 
}); 



//REGISTER  OUR ROUTES =======================================
// all routes predefined with /api
app.use('/api', router); 


//START THE SERVER =======================================
app.listen(port); 
console.log('Port ' + port + ' is now ready for bidness'); 
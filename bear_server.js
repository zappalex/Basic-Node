//BASE SETUP =======================================


// call the packages we need 
var express 	= require('express'); 
var app 		= express(); 
var bodyParser 	= require('body-parser'); 
var mongoose 	= require('mongoose'); 

// local mongo db location. When hit, a collection named "bear" will automatically be created in the "Bear" db. 
mongoose.connect("mongodb://localhost/Bear"); 
var Bear 		= require("./app/models/bear")

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
	res.json({message: 'welcome to the bears api, motherfucker.'});
});


// -------- routes that end in /bears --------
// create a bear, get all bears here. 
router.route('/bears')

.post(function(req, res){
	var bear = new Bear(); 
	bear.name = req.body.name; 

	bear.save(function(err){
		if(err)
			res.send(err); 

		res.json({message: bear.name + " the bear was just created!"}); 
	}); 
}) // remember: no '; ' here, they are linked.  fool. 

.get(function(req, res){
	Bear.find(function(err, bears){
		if(err)
			res.send(err); 

		res.json(bears); 
	}); 
}); 


// ------ routes that end in /bears/:bear_id --------
// get a single bear / update a single bear / delete a fucking bear. 
router.route('/bears/:bear_id')

// get a single bear by id
.get(function(req, res){
	Bear.findById(req.params.bear_id, function(err, bear){
		if(err)
			res.send(err); 

		res.json(bear); 
	}); 
})

// update a bear by id
.put(function(req, res){

	Bear.findById(req.params.bear_id, function(err, bear){
		if(err)
			res.send(err); 

		bear.name = req.body.name; 

		bear.save(function(err){
			if(err)
				res.send(err); 

			res.json({ message: "Bear updated!"}); 
		});
	});
})

// delete a bear by id
.delete(function(req, res){

	Bear.remove({
		 _id: req.params.bear_id
	}, function(err, bear){
		if(err)
			res.send(err); 

		res.json({ message: 'Bear successfully deleted :('}); 
	}); 
}); 



//REGISTER  OUR ROUTES =======================================
// all routes predefined with /api
app.use('/api', router); 


//START THE SERVER =======================================
app.listen(port); 
console.log('Port ' + port + ' is now ready for bidness'); 
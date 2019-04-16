var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),
	Group = require("./models/groupModel"),	
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	path = require('path'),
	Joi = require('joi'),
	url = "mongodb://localhost:27017",
	userprofile =  null;
	userID = null;
	groupID = null;
	//db = require("./models/user.js"),
	//collection = "users";
	MongoClient = require("mongodb").MongoClient;
	



const app = express();
const mongoOptions = {useNewUrlParser : true};
const temp = "username";
//mongoose.connect("mongodb://localhost/groupee");
//User.getDB();

//database connection part start  //////////////////////////////////////////
mongoose.connect('mongodb://localhost:27017/groupee' , { useNewUrlParser: true });


// database connection part ends /////////////////////////////////////////

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
	secret: "secret message",
	resave: false,
	saveUninitialezed: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//creating a new group from home page
app.get("/", function(req, res){
	res.render("home");
});


//createGroup

app.get("/grouphome", function(req, res){
	res.render("grouphome");
});

//handling Group Creation the Logical Part
app.post("/grouphome", function(req, res){
	req.body.groupName
	groupID = 1
	req.body.type
	req.body.objective
	adminName=userprofile
	userID = 1
	chats = null

	// MongoClient.connect(url, (err, client) => {
	// 	if (err) {
	// 	  console.error(err)
	// 	  return
	// 	}
	// 	else{
	// 		const db = client.db('groupee');
	// 		const collection = db.collection('users');
	// 		collection.find().toArray((err, items) => {
	// 			// res.render('todos', {
	// 			// 	infos: items
	// 			// });
	// 			// console.log(items)
	// 			Infos = items;
	// 			//var parseVal = JSON.parse(items);
    //      		console.log(items);
    //         	res.render('todo', {'infos': items});
	// 		  });
	// 	}
	//   });

	Group.registerGroup(new Group({
		groupName: req.body.groupName, 
		type: req.body.type, 
		objective: req.body.objective,  
	}), 
	req.body.password, function(err, user){ //use of middleware
		if(err){
			console.log(err);
			return res.render('register');
		}
	});
});

app.use(express.static(__dirname + '/views'));

// app.get("/profile", isLoggedIn, function(req, res){  //using middleware and a facade design pattern
// 	res.render("profile");
// });

app.get("/secret", isLoggedIn, function(req, res){  //using middleware and a facade design pattern
	res.render("secret");
});

//handling user signup the View Rendering Part
app.get("/register", function(req, res){
	res.render("register");
});

//handling user signup the Logical Part
app.post("/register", function(req, res){
	req.body.firstName
	req.body.lastName
	req.body.username
	req.body.eMail
	req.body.password
	User.register(new User({
		firstName: req.body.firstName, 
		lastName: req.body.lastName, 
		username: req.body.username, 
		eMail: req.body.eMail, 
	}), 
	req.body.password, function(err, user){ //use of middleware
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.render("profile", {
				// list: docs
			});
			console.log("User account creation successful for "+ req.body.username);
			console.log("a new user added to the users collection");
		});
	});
});

//handling user login the View Rendering Part
app.get("/login", function(req, res){
	res.render("login");
});

//handling user login the Logical Part
app.post("/login", function(req, res){
	req.body.firstName
	req.body.lastName
	req.body.username
	req.body.eMail
	req.body.password
	userprofile = req.body.username
	passport.authenticate("local")(req, res, function(){
		res.render("profile", {
			'infos': req.body.username
	});
		console.log("hello "+ userprofile);
		});
}, passport.authenticate("local", {
	successRedirect: "/secret",
	failureRedirect: "/login"
}));



// //handling user signup the Logical Part
// app.post("/login", passport.authenticate("local", {
// 	successRedirect: "/secret",
// 	failureRedirect: "/login"
// })	, function(req, res){
// console.log("Login Sucessful");
// });

app.get("/logout", function(req, res){
	req.logout(); 	//use of facade design pattern
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}


//todo list read
app.get('/myToDos', function(req, res) {
	
	MongoClient.connect(url, (err, client) => {
		if (err) {
		  console.error(err)
		  return
		}
		else{
			const db = client.db('groupee');
			const collection = db.collection('users');
			collection.find().toArray((err, items) => {
				// res.render('todos', {
				// 	infos: items
				// });
				// console.log(items)
				Infos = items;
				//var parseVal = JSON.parse(items);
         		console.log(items);
            	res.render('todo', {'infos': items});
			  });
		}
	  });
    
});


// schema used for data validation for our todo document
const schema = Joi.object().keys({
    todo : Joi.string().required()
});

//app.use(express.static(__dirname + '/views'));

// parses json data sent to us by the user 
app.use(bodyParser.json());



// app.get("/profile", isLoggedIn, function(req, res){  //using middleware and a facade design pattern
// 	res.render("profile");
// });

//experiment code
app.get('/profile', isLoggedIn, function(req, res){
	res.render("profile", {
	'infos': userprofile
		});
		console.log("welcome "+ userprofile);
});

// // read

// app.get('/myToDos',(req,res){
//     // get all Todo documents within our todo collection
// 	// send back to user as json
// 	console.log("taoseeeeeefff");
//     db.getDB().collection(collection).find({}).toArray((err,documents)=>{
//         if(err)
//             console.log(err);
//         else{
//             res.json(documents);
//         }
//     });
// });

// update
app.put('/:id',(req,res)=>{
    // Primary Key of Todo Document we wish to update
    const todoID = req.params.id;
    // Document used to update
    const userInput = req.body;
	// Find Document By ID and Update
    db.getDB().collection(collection).findOneAndUpdate({_id : db.getPrimaryKey(todoID)},{$set : {todo : userInput.todo}},{returnOriginal : false},(err,result)=>{
        if(err)
            console.log(err);
        else{
            res.json(result);
        }      
    });
});


//create
app.post('/',(req,res,next)=>{
    // Document to be inserted
    const userInput = req.body;

    // Validate document
    // If document is invalid pass to error middleware
    // else insert document within todo collection
    Joi.validate(userInput,schema,(err,result)=>{
        if(err){
            const error = new Error("Invalid Input");
            error.status = 400;
            next(error);
        }
        else{
            db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
                if(err){
                    const error = new Error("Failed to insert Todo Document");
                    error.status = 400;
                    next(error);
                }
                else
                    res.json({result : result, document : result.ops[0],msg : "Successfully inserted Todo!!!",error : null});
            });
        }
    })    
});



//delete
app.delete('/:id',(req,res)=>{
    // Primary Key of Todo Document
    const todoID = req.params.id;
    // Find Document By ID and delete document from record
    db.getDB().collection(collection).findOneAndDelete({_id : db.getPrimaryKey(todoID)},(err,result)=>{
        if(err)
            console.log(err);
        else
            res.json(result);
    });
});

// Middleware for handling Error
// Sends Error Response Back to User
app.use((err,req,res,next)=>{
    res.status(err.status).json({
        error : {
            message : err.message
        }
    });
})

var server = app.listen(5000, function(){
	console.log("server has started on port 5000");	
});

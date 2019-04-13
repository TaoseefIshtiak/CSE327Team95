var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),	
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose")
const path = require('path');
const Joi = require('joi');

const db = require("./models/user.js");
const collection = "users";
// const app = express();

mongoose.connect("mongodb://localhost/groupee");



var app = express();
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

app.post("/", function(req, res){
	res.render("groupHome");
});

//createGroup

app.get("/grouphome", function(req, res){
	res.render("grouphome");
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
app.post("/login", passport.authenticate("local", {
		successRedirect: "/secret",
		failureRedirect: "/login"   //use of facade design pattern
})	, function(req, res){
	console.log("Login Sucessful");
});

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

// //user profile creation logical part
// app.get("/user/:username", function(req, res){
// 	User.findById(req.params.username, function(err, foundUser){
// 		if(err){
// 			console.log(err, "something went wrong");
// 			return res.render('register');
// 		}
// 		res.redirect("/profile", {user: foundUser});
// 	});
// });



// schema used for data validation for our todo document
const schema = Joi.object().keys({
    todo : Joi.string().required()
});

//app.use(express.static(__dirname + '/views'));

// parses json data sent to us by the user 
app.use(bodyParser.json());

// serve static html file to user
app.get("/myToDos", function(req, res){
	res.render("todo");
});

// app.get("/profile", isLoggedIn, function(req, res){  //using middleware and a facade design pattern
// 	res.render("profile");
// });

//experiment code
app.get('/profile', isLoggedIn, function(req, res){  //using middleware and a facade design pattern
    db.find({}, function(err, result){
        if(err)
            return res.status(400).send(err);
		// here were are passing to our view all the elements we got from out query
		console.log("entered into " + User.username + "profile");
        res.render('profile', { title: 'Express', username: req.session.user, successful: req.query.valid, data: result });
    });
});

// // read
app.get('/myToDos',(req,res)=>{
    // get all Todo documents within our todo collection
    // send back to user as json
    db.getDB().collection(collection).find({}).toArray((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
});

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

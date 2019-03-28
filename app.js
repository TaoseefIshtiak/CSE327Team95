var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),	
	LocalStrategy = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose")
mongoose.connect("mongodb://localhost/loginreg_auth");


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

app.get("/", function(req, res){
	res.render("home");
});

app.use(express.static(__dirname + '/views'));

app.get("/secret", isLoggedIn, function(req, res){
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
	req.body.avatar
	req.body.password
	User.register(new User({
		// firstName: req.body.firstName, 
		// lastName: req.body.lastName, 
		username: req.body.username, 
		// eMail: req.body.eMail, 
		// avatar: req.body.avatar
	}), 
	req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.render("/profile", {
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

//handling user signup the Logical Part
app.post("/login", passport.authenticate("local", {
		successRedirect: "/secret",
		failureRedirect: "/login"
})	, function(req, res){
	console.log("Login Sucessful");
});

app.get("/logout", function(req, res){
	req.logout();
	res.redirect("/");
});

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect("/login");
}

//user profile creation logical part
app.get("/user/:username", function(req, res){
	User.findById(req.params.username, function(err, foundUser){
		if(err){
			console.log(err, "something went wrong");
			return res.render('register');
		}
		res.redirect("/profile", {user: foundUser});
	});
});


var server = app.listen(5000, function(){
	console.log("server has started on port 5000");	
});

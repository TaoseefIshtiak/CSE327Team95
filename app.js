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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res){
	res.render("home");
});

app.use(express.static(__dirname + '/views'));

app.get("/secret", function(req, res){
	res.render("secret");
});

app.get("/register", function(req, res){
	res.render("register");
});

//handling user signup
app.post("/register", function(req, res){
	req.body.username
	req.body.password
	User.register(new User({username: req.body.username}), req.body.password, function(err, user){
		if(err){
			console.log(err);
			return res.render('register');
		}
		passport.authenticate("local")(req, res, function(){
			res.redirect("/secret");
			console.log("a new user added to the users collection");
		});
	});
});
var server = app.listen(5000, function(){
	console.log("server has started on port 5000");	
});

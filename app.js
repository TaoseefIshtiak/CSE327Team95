var express = require("express"),
	mongoose = require("mongoose"),
	passport = require("passport"),
	bodyParser = require("body-parser"),
	User = require("./models/user"),
	Group = require("./models/group"),
	Post = require("./models/post"),
	Todo = require("./models/todo"),	
	LocalStrategy = require("passport-local"),
	multer = require('multer'),
	passportLocalMongoose = require("passport-local-mongoose"),
	path = require('path'),
	Joi = require('joi'),
	dburl = "mongodb://localhost:27017",
	userprofile =  null,
	usr_id = null,
	todo_id = null,
	//profilename = null,
	userID = 2,
	groupID = 3,
	chats = "chatss"
	//db = require("./models/user.js"),
	//collection = "users";
	MongoClient = require("mongodb").MongoClient;
	

const app = express();
const mongoOptions = {useNewUrlParser : true};

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



var storage = multer.diskStorage({
  			destination: function (req, file, cb) {
    			cb(null, 'data')
  			},
  			filename: function (req, file, cb) {
    			cb(null, Date.now() + file.originalname)
  			}
})

var upload = multer({ storage: storage })

// schema used for data validation for our todo document
const schema = Joi.object().keys({
    todo : Joi.string().required()
});

//app.use(express.static(__dirname + '/views'));

// parses json data sent to us by the user 
app.use(bodyParser.json());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(express.static(__dirname + '/views'));

// app.get("/profile", isLoggedIn, function(req, res){  //using middleware and a facade design pattern
// 	res.render("profile");
// });

//creating a new group from home page
app.get("/", function(req, res){
	res.render("Homepage");
});


//createGroup

app.get("/grouphome", function(req, res){
	res.render("grouphome");
});


// //experiment code to create new group
// app.post('/grouphome', function(req, res, next) {
// 	console.log(userprofile+ " is trying to create a group");
// 	req.body.groupName
// 	req.body.type
// 	req.body.objective
// 	groupID = 1
// 	adminName = userprofile
// 	userID = 1
// 	chats = "null"
// 	mongoose.connect('mongodb://localhost:27017/groupee' , { useNewUrlParser: true }, function(err, client) {
// 	  if(err){ 
// 		  throw err;  
// 		}
// 		var db = client.db('groupee');
// 	  	var collection = db.collection('groups');
// 	  	var inputs = {  
// 		  	groupName: req.body.groupName, 
// 			type: req.body.type, 
// 			objective: req.body.objective,
// 			groupID : 	groupID+2,
// 			adminName : userprofile,
// 			userID :  userID+2,
// 			chats : chats, 
// 		};
// 	  collection.insert(inputs, function(err, result) {
// 	  if(err) { throw err; }
// 		console.log(result);
// 		client.close();
// 		res.render('profile', {
// 			'infos': userprofile
// 		});   
// 	});
// 	});
//   });

//handling Group Creation the Logical Part
app.post("/grouphome", function(req, res){
	console.log(userprofile+ " is trying to create a group");
	var groupinfo = new Group({ //You're entering a new bug here, giving it a name, and specifying it's type.
	groupName: req.body.groupName, 
	type: req.body.type, 
	objective: req.body.objective,
	groupID : 	groupID,
	adminName : userprofile,
	userID :  userID,
	chats : chats,
 	});
	groupinfo.save(function(error) {
		console.log("Your bee has been saved!");
		if (error) {
	    console.error(error);
		 }
		else{
			res.render("profile", {
				'infos': userprofile
			});
		}});
	console.log(userprofile+ " is trying to create a group");
});

//creating user post -------->
app.get("/createPost", isLoggedIn, function(req, res){
	MongoClient.connect(dburl, (err, client) => {
		if (err) {
		  console.error(err)
		  return
		}
		else{
			const dbPosts = client.db('groupee');
			const collectiondbPosts = dbPosts.collection('posts');
			collectiondbPosts.find().toArray((err, items) => {
				// res.render('todos', {
				// 	infos: items
				// });
				// console.log(items)
				Infos = items;
				//var parseVal = JSON.parse(items);
         		console.log(items);
            	res.render('group', {'infos': items});
			  });
		}
	  });
});


app.post("/createPost",upload.single('postFile'), function(req, res){
	console.log(userprofile+ " is trying to create a User post");
	
	if(req.file) {
		var postinfo = new Post({ //You're entering a new bug here, giving it a name, and specifying it's type.
			post : req.body.post,
			createdby: userprofile,
			postID : 1,
    		poll: null,
			pollID : 1,
			postDateTime : Date.now(),
			fileName : req.file.filename,
			originalName : req.file.originalname
 		});
	}
	else {
		var postinfo = new Post({ //You're entering a new bug here, giving it a name, and specifying it's type.
			post : req.body.post,
			createdby: userprofile,
			postID : 1,
    		poll: null,
			pollID : 1,
			postDateTime : Date.now()
 		});
	}

	postinfo.save(function(error) {
		console.log("Your post has been saved!");
		if (error) {
	    console.error(error);
		 }
		else{
			res.render("profile", {
				'infos': userprofile
			});
		}});
});


app.get("/secret", isLoggedIn, function(req, res){  //using middleware and a facade design pattern
	res.render("secret");
});

//handling user signup the View Rendering Part
app.get("/register", function(req, res){
	res.render("Firstpage");
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
			return res.render('Firstpage');
		}
		passport.authenticate("local")(req, res, function(){
			res.render("profile", {
				'infos': req.body.username
			});
			console.log("User account creation successful for "+ req.body.username);
			console.log("a new user added to the users collection");
		});
	});
});

//handling user login the View Rendering Part
app.get("/login", function(req, res){
	res.render("Firstpage");
});

app.get('/download/:file(*)',(req, res) => {
  var file = req.params.file;
  var fileLocation = path.join('./data',file);
  res.download(fileLocation, file);
});

//Invite Member Starts

app.get('/group/:group(*)',(req,res) => {
	var groupID = req.params.group;
	MongoClient.connect(dburl, (err, client) => {
		if (err) {
		  console.error(err)
		  return
		}
		else{
			const dbPosts = client.db('groupee');
			const collectiondbPosts = dbPosts.collection('groups');
			if(collectiondbPosts.find(groupID)){
				res.render('invite',{'groupID':groupID});
			}
			else{
				console.log("Group does not exist");
			}
		}
	  });
});

app.post('/invite/:group(*)', (req,res) => {

});

//Invite Member Ends
//handling user login the Logical Part
app.post("/login", function(req, res){
	req.body.username
	req.body.password
	userprofile = req.body.username
	//profilename = userprofile
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


/////////////code for todo list section/////////////
//todo list read

//create

app.post("/myToDos", function(req, res){
	console.log(userprofile+ " is trying to create a todo");
	var todoinfo = new Todo({ 
	createdby: userprofile,
    todoList : req.body.todo,
 	});
	todoinfo.save(function(error) {
		console.log("Your todo has been saved!");
		if (error) {
	    console.error(error);
		}
		else{
			console.log(userprofile+ " inserted his new todo " +req.body.todo);
			res.render("secret");
		}
	});
});


//handling user login the View Rendering Part

// app.get("/myToDos", function(req, res){
// 	res.render("todo");
// });

app.get('/myToDos', function(req, res) {
	
	MongoClient.connect(dburl, (err, client) => {
		if (err) {
		  console.error(err)
		  return
		}
		else{
			const dbToDos = client.db('groupee');
			const collectiondbToDos = dbToDos.collection('todos');
			collectiondbToDos.find().toArray((err, items) => {
				Infos = items;
				console.log(items);
				res.render('todo', {'infos': items,
											viewTitle: "Update todo",
											'profile': userprofile});
				for (var i = 0; i < items.length; i++) { 
					if(items[i].createdby == userprofile){
						console.log(items[i].createdby + " you are trying to read information of " + items[i]._id + items[i].todoList);
						todo_id = items[i]._id;
						console.log(items[i]._id);
						console.log(items[i].todoList);
					}
				}
			  });
		}
	  });
    
});


// //profile view section for todo list updataion
// app.post('/profile', (req, res) => {
//     updateRecord(req, res);
// });


// function updateRecord(req, res) {
// 	console.log(req.body._id);
//     User.findOneAndUpdate({ _id: usr_id }, req.body, { new: true }, (err, doc) => {
//         if (!err){ 
// 			res.redirect('secret'); 
// 		}
//         else {
//             if (err.name == 'ValidationError') {
//                 // handleValidationError(err, req.body);
//                 res.render("profile", {
//                     viewTitle: 'Update Userinfo',
//                     infos: req.body
//                 });
//             }
//             else
//                 console.log('Error during record update : ' + err);
//         }
//     });
// }

// app.get('/profile', isLoggedIn, function(req, res){
// 	MongoClient.connect(dburl, (err, client) => {
// 		if (err) {
// 		  console.error(err)
// 		  return
// 		}
// 		else{
// 			const dbUserInfo = client.db('groupee');
// 			const collectiondbUserInfo = dbUserInfo.collection('users');
// 			collectiondbUserInfo.find().toArray((err, items) => {
// 				Infos = items;
// 				for (var i = 0; i < items.length; i++) { 
// 					if(items[i].username == userprofile){
// 						console.log(userprofile + "you are trying to read information of "+ items[i].username + items[i]._id);
// 						usr_id = items[i]._id;
// 						res.render('profile', {'infos': items[i],
// 												viewTitle: "Update user"});
// 					}
// 				}
// 			  });
// 		}
// 	  });
// });

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




// app.post('/',(req,res,next)=>{
//     // Document to be inserted
//     const userInput = req.body;

//     // Validate document
//     // If document is invalid pass to error middleware
//     // else insert document within todo collection
//     Joi.validate(userInput,schema,(err,result)=>{
//         if(err){
//             const error = new Error("Invalid Input");
//             error.status = 400;
//             next(error);
//         }
//         else{
//             db.getDB().collection(collection).insertOne(userInput,(err,result)=>{
//                 if(err){
//                     const error = new Error("Failed to insert Todo Document");
//                     error.status = 400;
//                     next(error);
//                 }
//                 else
//                     res.json({result : result, document : result.ops[0],msg : "Successfully inserted Todo!!!",error : null});
//             });
//         }
//     })    
// });



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


// app.get("/profile", isLoggedIn, function(req, res){  //using middleware and a facade design pattern
// 	res.render("profile");
// });

//profile view section
app.post('/editProfile', (req, res) => {
    updateRecord(req, res);
});


function updateRecord(req, res) {
	console.log(req.body._id);
    User.findOneAndUpdate({ _id: usr_id }, req.body, { new: true }, (err, doc) => {
        if (!err){ 
			res.redirect('secret'); 
		}
        else {
            if (err.name == 'ValidationError') {
                // handleValidationError(err, req.body);
                res.render("profile", {
                    viewTitle: 'Update Userinfo',
                    infos: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

app.get('/profile', isLoggedIn, function(req, res){
	MongoClient.connect(dburl, (err, client) => {
		if (err) {
		  console.error(err)
		  return
		}
		else{
			const dbUserInfo = client.db('groupee');
			const collectiondbUserInfo = dbUserInfo.collection('users');
			collectiondbUserInfo.find().toArray((err, items) => {
				Infos = items;
				for (var i = 0; i < items.length; i++) { 
					if(items[i].username == userprofile){
						console.log(userprofile + "you are trying to read information of "+ items[i].username + items[i]._id);
						usr_id = items[i]._id;
						res.render('profile', {'infos': items[i],
												viewTitle: "Update user"});
					}
				}
			  });
		}
	  });
});

app.get('/editProfile', isLoggedIn, function(req, res){
	MongoClient.connect(dburl, (err, client) => {
		if (err) {
		  console.error(err)
		  return
		}
		else{
			const dbUserInfo = client.db('groupee');
			const collectiondbUserInfo = dbUserInfo.collection('users');
			collectiondbUserInfo.find().toArray((err, items) => {
				Infos = items;
				for (var i = 0; i < items.length; i++) { 
					if(items[i].username == userprofile){
						console.log(userprofile + "you are trying to read information of "+ items[i].username + items[i]._id);
						usr_id = items[i]._id;
						res.render('profileedit', {'infos': items[i],
												viewTitle: "Updated your profile"});
					}
				}
			  });
		}
	  });
});


var server = app.listen(5000, function(){
	console.log("server has started on port 5000");	
});



// function insertRecord(req, res) {
//     var employee = new Employee();
//     employee.fullName = req.body.fullName;
//     employee.email = req.body.email;
//     employee.mobile = req.body.mobile;
//     employee.city = req.body.city;
//     employee.save((err, doc) => {
//         if (!err)
//             res.redirect('employee/list');
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("employee/addOrEdit", {
//                     viewTitle: "Insert Employee",
//                     employee: req.body
//                 });
//             }
//             else
//                 console.log('Error during record insertion : ' + err);
//         }
//     });
// }
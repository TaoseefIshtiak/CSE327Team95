var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/groupee' , { useNewUrlParser: true });

var passportLocalMongoose = require("passport-local-mongoose");
const MongoClient = require("mongodb").MongoClient;

const ObjectID = require('mongodb').ObjectID;

// location of where our mongoDB database is located
mongoose.connect("mongodb://localhost:27017/groupee"); //Test is the database name. 
 
var db = mongoose.connection;
 
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback){
console.log("Connection to database Succeeded."); /* Once the database connection has succeeded, the code in db.once is executed. */
});

var GroupSchema = new mongoose.Schema({
	groupName : String,
	type : String,
	objective : String,
	groupID : String,
	adminName : String,
	userID : String,
	chats : String,
});


// returns OBJECTID object used to 
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}




GroupSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("group", GroupSchema);
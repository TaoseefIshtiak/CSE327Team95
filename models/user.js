var mongoose = require("mongoose");

//mongoose.connect('mongodb://localhost:27017/groupee' , { useNewUrlParser: true });

var passportLocalMongoose = require("passport-local-mongoose");
const MongoClient = require("mongodb").MongoClient;

const ObjectID = require('mongodb').ObjectID;

// location of where our mongoDB database is located
const url = "mongodb://localhost:27017";

// Options for mongoDB
const mongoOptions = {useNewUrlParser : true};


var UserSchema = new mongoose.Schema({
	// userID: {
	// 	type: Number,
	// 	autoIncreament: true,
	// 	primaryKey: true
	// },
	firstName: String,
	lastName: String,
	username: String,
	eMail: String,
	password: String,
	//phoneNo: String,
	//avatar: String,
	//toDos: String,
	//dateTime: Date
});




// returns OBJECTID object used to 
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}




UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);

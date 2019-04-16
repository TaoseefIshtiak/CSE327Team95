var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/groupee' , { useNewUrlParser: true });

var passportLocalMongoose = require("passport-local-mongoose");
const MongoClient = require("mongodb").MongoClient;

const ObjectID = require('mongodb').ObjectID;

// location of where our mongoDB database is located
const url = "mongodb://localhost:27017";

// Options for mongoDB
const mongoOptions = {useNewUrlParser : true};


var GroupSchema = new mongoose.Schema({
	groupName : String,
	type : String,
	objective : String,
	groupID : Number,
	adminName : String,
	userID : Number,
	chats : String,
});


// returns OBJECTID object used to 
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}




GroupSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("group", GroupSchema);
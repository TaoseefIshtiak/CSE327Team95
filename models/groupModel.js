var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/groupee' , { useNewUrlParser: true });

var passportLocalMongoose = require("passport-local-mongoose");
const MongoClient = require("mongodb").MongoClient;

const ObjectID = require('mongodb').ObjectID;

// location of where our mongoDB database is located
const url = "mongodb://localhost:27017";

// Options for mongoDB
const mongoOptions = {useNewUrlParser : true};


var UserSchema = new mongoose.Schema({
    groupName = String,
	groupID = Number,
	type = String,
	objective = String,
	userprofile = String,
	userID = String,
	chats = String,
});


// returns OBJECTID object used to 
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}

// returns database connection 
const getDB = ()=>{
    console.log("working");
    return state.db;
}


UserSchema.plugin(passportLocalMongoose);

module.exports = {getDB,connect,getPrimaryKey};
module.exports = mongoose.model('infos', UserSchema, 'infos');
module.exports = mongoose.model("user", UserSchema);
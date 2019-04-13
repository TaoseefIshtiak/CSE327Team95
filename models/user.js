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


const state = {
    db : null
};

const connect = (cb) =>{
    // if state is not NULL
    // Means we have connection already, call our CB
    if(state.db)
        cb();
    else{
        // attempt to get database connection
        MongoClient.connect(url,mongoOptions,(err,client)=>{
            // unable to get database connection pass error to CB
            if(err)
                cb(err);
            // Successfully got our database connection
            // Set database connection and call CB
            else{
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

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
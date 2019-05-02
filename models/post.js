var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/groupee' , { useNewUrlParser: true });

var passportLocalMongoose = require("passport-local-mongoose");
 
var db = mongoose.connection;
 
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", function(callback){
console.log("Connection to database Succeeded."); /* Once the database connection has succeeded, the code in db.once is executed. */
});

var PostSchema = new mongoose.Schema({
    post : String,
    createdby: String,
    postID : String,
    poll: String,
	pollID : String,
	postDateTime : String,
<<<<<<< HEAD
    fileName : String,
    originalName: String
=======
	fileName : String,
	originalName : String
>>>>>>> 7aa266a34b57b397e2f182c97231a6ed045c77df
});


// returns OBJECTID object used to 
const getPrimaryKey = (_id)=>{
    return ObjectID(_id);
}




PostSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("post", PostSchema);

db.close();
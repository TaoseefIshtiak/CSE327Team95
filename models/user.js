var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	userID: {
		type: Number,
		autoIncreament: true,
		primaryKey: true
	},
	firstName: String,
	lastName: String,
	eMail: String,
	phoneNo: String,
	userName: String,
	password: String,
	avatar: String,
	toDos: String,
	dateTime: Date
});


UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("user", UserSchema);
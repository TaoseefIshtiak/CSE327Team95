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
	email: String,
	phoneNo: String,
	userName: String,
	password: String,
	avatar: String,
	tasks: String,
	dateTime: Date
});


UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", UserSchema);
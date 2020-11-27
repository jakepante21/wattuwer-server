const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	firstname : {
		type : String,
		required : true
	},
	lastname : {
		type : String,
		required : true
	},
	address : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	password : {
		type : String,
		required : true
	},
	role : {
		type : String,
		default : "User"
	},
	dateCreated : {
		type : Date,
		default : Date.now
	}
});

module.exports = mongoose.model("User",UserSchema);
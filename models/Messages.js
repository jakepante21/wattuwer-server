const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
	userName : {
		type : String,
		required : true
	},
	email : {
		type : String,
		required : true
	},
	subject : {
		type : String,
		required : true
	},
	message : {
		type : String,
		required : true
	}
})

module.exports = mongoose.model("Message",MessageSchema);
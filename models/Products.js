const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	name : {
		type : String,
		required : true
	},
	price : {
		type : Number,
		required : true
	},
	categoryId : {
		type : String,
		required : true
	},
	genderId : {
		type : String,
		required : true
	},
	description : {
		type : String,
		required : true
	},
	image : {
		type : String,
		required : true
	},
	stocks : {
		type : Number,
		default : 0
	},
	status : {
		type : String,
		default : "No stock"
	}
})

module.exports = mongoose.model("Product",ProductSchema);
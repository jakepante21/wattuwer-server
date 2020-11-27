const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SoldStockSchema = new Schema({
	productId : {
		type : String,
		required : true
	},
	codeNumber : {
		type : String,
		required : true
	}
})

module.exports = mongoose.model("SoldStock",SoldStockSchema);
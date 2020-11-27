const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
	productId : {
		type : String,
		required : true
	},
	codeNumber : {
		type : String,
		required : true
	}
})

module.exports = mongoose.model("Stock",StockSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
	transactionCode : {
		type : String,
		required : true,
		unique : true
	},
	userId : {
		type : String,
		required : true
	},
	contactNo : {
		type : Number,
		required: true
	},
	status : {
		type : String,
		default : "Pending"
	},
	paymentMode : {
		type : String,
		required : true
	},
	products : [
		{
			productId : {
				type : String,
				required : true
			},
			items : [
				{
					codeNumber : {
						type : String,
						required : true
					}
				}
			],
			name : {
				type : String,
				required : true
			},
			price : {
				type : Number,
				required : true
			},
			quantity : {
				type : Number,
				required : true
			},
			subtotal : {
				type : Number,
				required : true
			}
		}
	],
	createdAt : {
		type : Date,
		default : Date.now
	},
	total : {
		type : Number,
		required : true
	}
})

module.exports = mongoose.model("Transaction",TransactionSchema);
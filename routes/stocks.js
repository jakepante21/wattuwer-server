const express = require("express");
const router = express.Router();
const Stocks = require("./../models/Stocks");
const Products = require("./../models/Products");
const passport = require("passport");
const auth = require("./../authorization");

// create
router.post("/create",passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	let productId = req.body.productId;
	let codeLetters = "WT";
	let codeNumbers = Math.floor((Math.random() * (999999 - 100000) + 100000));
	let itemCodeNumber = codeLetters + codeNumbers;

	Stocks.create({
		productId,
		codeNumber : itemCodeNumber
	})
	.then(stock => {
		res.json(stock);
		Products.findById({ _id : stock.productId})
		.then(product => {
			let productStock = product.stocks;
			let newStock = productStock + 1;
			Products.findByIdAndUpdate({ _id : product._id},{stocks : newStock},{new : true})
			.then(product => {

			})
			.catch(next);
		})
		.catch(next);
	})
	.catch(next);
})

// view all
router.get("/",(req,res,next)=>{
	Stocks.find()
	.then(stocks => {
		res.json(stocks)
	})
	.catch(next);
})

// delete
router.delete("/admin-only/api/wattuwer/stock/:id",(req,res,next) => {
	Stocks.findOneAndDelete({ _id : req.params.id})
	.then(stock => {
		res.json(stock);
	})
	.catch(next)
})

module.exports = router;
const express = require("express");
const router = express.Router();
const OrderStocks = require("./../models/OrderStocks");
const passport = require("passport");
const auth = require("./../authorization");

// create
router.post("/create",(req,res,next) => {
	let productId = req.body.productId;
	let codeNumber = req.body.codeNumber;
	let _id = req.body._id;

	OrderStocks.create({
		_id,
		productId,
		codeNumber
	})
	.then(orderStock => {
		res.json(orderStock)
	})
	.catch(next)
})

// delete
router.delete("/admin-only/api/wattuwer/stock/:id",passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	OrderStocks.findOneAndDelete({ _id : req.params.id})
	.then(stock => {
		res.json(stock);
	})
	.catch(next)
})

module.exports = router;
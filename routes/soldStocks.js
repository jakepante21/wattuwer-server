const express = require("express");
const router = express.Router();
const SoldStocks = require("./../models/SoldStocks");
const passport = require("passport");
const auth = require("./../authorization");

// create
router.post("/create",passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	let productId = req.body.productId;
	let codeNumber = req.body.codeNumber;
	let _id = req.body._id;

	SoldStocks.create({
		_id,
		productId,
		codeNumber
	})
	.then(stock => {
		res.json(stock)
	})
	.catch(next);
})

module.exports = router;
const express = require("express");
const router = express.Router();
const Transactions = require("./../models/Transactions");
const Users = require("./../models/Users");
const passport = require("passport");
const auth = require("./../authorization");

// create
router.post("/create",(req,res,next) => {
	let transactionCode = req.body.transactionCode;
	let userId = req.body.userId;
	let contactNo = req.body.contactNo;
	let paymentMode = req.body.paymentMode;
	let products = req.body.products;
	let total = req.body.total;

	Transactions.create({
		transactionCode,
		userId,
		contactNo,
		paymentMode,
		products,
		total
	})
	.then(transaction => {
		res.json(transaction)
	})
	.catch(next);
})

// view all
router.get("/",passport.authenticate("jwt",{session : false}),(req,res,next)=>{
	if(req.user.role === "Admin"){
		Transactions.find()
		.then(transactions => {
			Users.find()
			.then(users => {
				transactions.map(transaction => {
					users.forEach(user => {
						if(transaction.userId == user._id){
							transaction.userId = user.firstname + " " + user.lastname;
						}
					})
					return transaction;
				})
				res.send(transactions)
			})
			.catch(next);
		})
	}else{
		Transactions.find({ userId : req.user._id})
		.then(transactions => {
			transactions.forEach(transaction => {
				transaction.userId = req.user.firstname + " " + req.user.lastname;
			})
			res.send(transactions)
		})
		.catch(next);
	}
})

// update
router.put("/:id",passport.authenticate('jwt',{session : false}),auth,(req,res,next)=>{
	Transactions.findByIdAndUpdate(req.params.id,{ status : req.body.status},{ new : true})
	.then(transaction=>{
		res.send(transaction)
	})
})

module.exports = router;
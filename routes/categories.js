const express = require("express");
const router = express.Router();
const Categories = require("./../models/Categories");
const passport = require("passport");
const auth = require("./../authorization");

// create
router.post("/create",passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	Categories.create({name : req.body.name})
	.then(category => {
		res.send(category);
	})
	.catch(next);
})

// view all
router.get("/",(req,res,next) => {
	Categories.find()
	.then( categories => {
		res.send(categories);
	})
	.catch(next);
})

// single view
router.get("/:id",passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	Categories.findOne({ _id : req.params.id})
	.then(category => {
		res.send(category)
	})
	.catch(next)
})

// update
router.put("/:id",passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	Categories.findOneAndUpdate(
		{
			_id : req.params.id
		},
		{
			name : req.body.name
		},
		{
			new : true
		}
	)
	.then(category => {
		res.json(category)
	})
	.catch(next);
})

// delete
router.delete("/:id",passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	Categories.findOneAndDelete({_id : req.params.id})
	.then(category => {
		res.json(category)
	})
	.catch(next);
})

module.exports = router;
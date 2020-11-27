const express = require("express");
const router = express.Router();
const GenderCategories = require("./../models/GenderCategories");
const passport = require("passport");
const auth = require("./../authorization");

// create
router.post("/create",passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	let name = req.body.name;
	GenderCategories.create({name : name})
	.then(genderCategory => {
		res.send(genderCategory);
	})
	.catch(next);
})

// view all
router.get("/",(req,res,next)=> {
	GenderCategories.find()
	.then(genderCategories => {
		res.send(genderCategories);
	})
	.catch(next);
})

module.exports = router;
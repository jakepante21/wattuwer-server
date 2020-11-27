const express = require("express");
const router = express.Router();
const Messages = require("./../models/Messages");
const passport = require("passport");
const auth = require("./../authorization");

// router

// create
router.post("/create",(req,res,next) => {
	Messages.create({
		userName : req.body.name,
		email : req.body.email,
		subject : req.body.subject,
		message : req.body.message
	})
	.then(message => {
		res.json(message);
	})
	.catch(next);
})

// view all
router.get("/",(req,res,next) => {
	Messages.find()
	.then(messages => {
		res.json(messages);
	})
	.catch(next);
})

module.exports = router;
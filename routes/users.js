const router = require("express").Router();
const Users = require("./../models/Users");
const bcrypt = require("bcrypt");
const passport = require("passport");
require("./../passport-setup");
const jwt = require("jsonwebtoken");

// create account

router.post("/register", (req,res,next) => {
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let address = req.body.address;
	let email = req.body.email;
	let password = req.body.password;
	let confirmPassword = req.body.confirmPassword;

	if(!firstname || !lastname || !address || !email || !password || !confirmPassword){
		return res.status(400).send({
			message : "Incomplete Fields!"
		})
	}

	if(password.length < 8){
		return res.status(400).send({
			message : "Password is too short, use atleast 8 characters"
		})
	}

	if(password !== confirmPassword){
		return res.status(400).send({
			message : "Passwords does not match!"
		})
	}

	Users.findOne({email : email})
	.then( user => {
		if(user){
			res.status(400).json({
				message : "Email is already taken"
			})
		}else{
			const saltRounds = 10;
			bcrypt.genSalt(saltRounds,(err,salt) => {
				bcrypt.hash(password,salt,(err,hash) => {
					Users.create({
						firstname,
						lastname,
						address,
						email,
						password : hash
					})
					.then( user => {
						res.send({
							successMessage : "Register Success! You can now login"
						})
					})
					.catch(next)
				})
			})
		}
	})

});

// login

router.post("/login",(req,res,next) => {
	let email = req.body.email;
	let password = req.body.password;

	if(!email || !password){
		return res.status(400).send({
			message : "Incomplete credentials"
		})
	}

	Users.findOne({email})
	.then(user => {
		if(!user){
			return res.status(400).send({
				message : "User not found"
			})
		}else{
			bcrypt.compare(password,user.password,(err,passwordMatched)=>{
				if(passwordMatched){
					let token = jwt.sign({id : user._id},"secret");
					return res.send({
						message : "Login Success!",
						token,
						user : {
							firstname : user.firstname,
							lastname : user.lastname,
							address : user.address,
							role : user.role,
							id : user._id
						}
					})
				}else{
					return res.send({
						message : "Wrong password, try agin"
					})
				}
			})
		}
	})
	.catch(next)
})

module.exports = router;
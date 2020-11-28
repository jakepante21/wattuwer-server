const express = require("express");
const router = express.Router();
const Products = require("./../models/Products");
const Stocks = require("./../models/Stocks");
const passport = require("passport");
const auth = require("./../authorization");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cloudinary = require('cloudinary').v2;

require('dotenv/config');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "project-wattuwer-bookacar",
  api_key: process.env.API_KEY || "874482535419333",
  api_secret: process.env.API_SECRET || "UMXQbOlpBPKIPq3GBaiNYmZ5AC4"
});

// image storage
const storage = multer.diskStorage({
	destination : function(req,file,cb){
		cb(null,"public/products")
	},
	filename : function(req,file,cb){
		cb(null, Date.now() + "-" + file.originalname)
	}
})
// upload
const upload = multer({ storage : storage});

// create
router.post("/create",upload.single("image"),passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	// req.body.image = "/public/" + req.file.filename;
	let imageData = {
		image : req.file.path
	}
	let image = {
		url : null
	}
	cloudinary.uploader.upload(imageData.image)
	.then((result)=>{
		req.body.image = result.secure_url;
		Products.create(req.body)
		.then(product => {
			res.json(product);
			let productId = product._id;
			let codeLetters = "WT";
			let codeNumbers = Math.floor((Math.random()) * (999999 - 100000) + 100000);
			let itemCodeNumber = codeLetters + codeNumbers;
			let codeNumber = itemCodeNumber;
			Stocks.create({
				productId,
				codeNumber
			})
			.then(stock => {
				// res.json(stock);
				Products.findByIdAndUpdate({ _id : stock.productId },{stocks : 1, status : "Available"},{new : true})
				.then(product => {
					// res.json(product)
				})
				.catch(next);
			})
			.catch(next);
		})
		.catch(next);
	}).catch((error) => {
		res.status(500).send({
			message: "failure",
			error
		});
	});
})

// view all
router.get("/",(req,res,next) => {
	Products.find()
	.then(products => {
		res.json(products);
		let count = 0;
		let stock = [];

		products.forEach(product => {
			Stocks.find()
			.then(stocks => {
				stock = stocks.filter(item => {
					let stringId = JSON.stringify(product._id);
					let stringId2 = JSON.stringify(item.productId);
					return stringId === stringId2;
				})
				// console.log(stock)
				count = stock.length;
				Products.findByIdAndUpdate({_id : product._id},{stocks : count},{new : true})
				.then(products=> {

				})
				.catch(next);
			})
			.catch(next)
		})
	})
	.catch(next);
})

// single view
router.get("/:id",(req,res,next) => {
	Products.findById({ _id : req.params.id})
	.then(product => {
		res.json(product)
	})
	.catch(next);
})


// view per category
router.get("/category/:id",(req,res,next) => {
	Products.find()
	.then(result => {
		let newProducts = result.filter(product => {
			return product.categoryId === req.params.id;
		})
		// console.log(newProducts)
		res.json(newProducts);
	})
	.catch(next);
})

// update
router.put("/:id",upload.single('image'),passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	let update = {
		...req.body
	};
	if(req.file){
		update = {
			...req.body, image : "/public/" + req.file.filename
		}
	}
	Products.findOneAndUpdate(req.params._id , update , {new : true})
	.then(product => {
		res.json(product)
	})
	.catch(next)
})

// delete
router.delete("/:id",passport.authenticate("jwt",{session : false}),auth,(req,res,next) => {
	Products.findOneAndDelete(req.params._id)
	.then(product => {
		res.json(product)
	})
	.catch(next)
})

module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");

// initialize server
const app = express();
const port  = 3001;

mongoose.connect("mongodb://localhost/wattuwer",() => {
	console.log("connected to db");
})

// middlewares
app.use(passport.initialize());
app.use(cors());
app.use("/public",express.static("public/products"));
app.use(bodyParser.json());

mongoose.set("useFindAndModify",true);

app.use("/users",require("./routes/users"));
app.use("/categories",require("./routes/categories"));
app.use("/gender-categories",require("./routes/genderCategories"));
app.use("/products",require("./routes/products"));
app.use("/stocks",require("./routes/stocks"));
app.use("/sold-stocks",require("./routes/soldStocks"));
app.use("/order-stocks",require("./routes/orderStocks"));
app.use("/transactions",require("./routes/transactions"));
app.use("/messages",require("./routes/messages"));

app.use(function (err,req,res,next){
	res.status(400).json({
		err : err.message
	});
});

app.listen( port, () => {
	console.log(`You are listening in port ${port}`);
})
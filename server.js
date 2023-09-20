// importing express, mongoose dotenv, product
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Product = require("./models/productModel")

//DB URL from dotenv so that the server can connect to mongoDB
const uri = process.env.DB;

const app = express();

//MIDDLEWARE
app.use(express.json());

//PORT
const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  console.log("get");
  res.send("Hi");
});


//Get all products from the database (find())
app.get("/product", async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)
        
    } catch(err) {
        console.log(err.message)
        res.status(500).json({ message: err.message})
    }
})

//Get products by id (findById())
app.get("/product/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
        
    } catch(err) {
        console.log(err.message)
        res.status(500).json({ message: err.message})
    }
})


//Posting data to MongoDB Database by using try and catch and sending status codes to the page

app.post("/product", async(req, res) => {
  try{
    const product = await Product.create(req.body)
    res.status(200).json({ product });
    
  }catch(err){
    console.log(err.message)
    res.status(500).json({ message: err.message})
  }
});

//connecting to mongoDB database and listening to port (whatever that is stored in the .env or default 8000 and the server cannot connect to the server it will log the error message)
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

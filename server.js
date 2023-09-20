// importing express, mongoose and dotenv
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//DB URL from dotenv so that the server can connect to mongoDB
const uri = process.env.DB;
const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  console.log("get");
  res.send("Hi");
});


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

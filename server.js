const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
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
    console.log("not connected");
  });

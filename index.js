//BASIC CONFIG
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

//
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURI(process.env.DB_PASSWORD);

//ROUTES
const personRoute = require("./routes/personRoute");
const productRoute = require("./routes/productRoute");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CALL ROUTES
app.use("/person", personRoute);
app.use("/product", productRoute);

app.get("/", (req, res) => {
  res.json({ message: "hi mom!" });
});

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster.rc1kr.mongodb.net/apidb?retryWrites=true&w=majority`
//    `mongodb+srv://alecxandroch:640480@cluster.rc1kr.mongodb.net/apidb?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to cluster!");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

// import contactRountes from "./routes/contact.js";

// import express from "express";
// import bodyParser from "body-parser";
// import path from "path";

// import dotenv from "dotenv";
// dotenv.config();

const contactRountes = require("./routes/contact.js");

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

console.log("HERE 1");
app.use("/api/contact", contactRountes.router);
console.log("HERE 2");

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

console.log("dirname", __dirname);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

console.log(`Setting up server on port: ${port}.....`);
app.listen(port, () => console.log("SUCCESS!"));
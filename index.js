const express = require("express");
bodyParser = require("body-parser");
uuid = require("uuid");

const { check, validationResult } = require("express-validator");

const morgan = require("morgan");
const app = express();
const mongoose = require("mongoose");
const Models = require("./models.js");


// Logging middleware
app.use(morgan("common"));

// For the sending of static files
app.use(express.static("public"));
app.use(bodyParser.json());

const cors = require("cors");
let allowedOrigins = [
  "https://superflixheroes.netlify.app",
  "http://localhost:1234",
  "http://localhost:4200",
  "https://movie-api-k8molony.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this application does not allow access from origin " +
          origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);

// Adding Passport authentication
let auth = require("./auth")(app);
const passport = require("passport");
require("./passport");

// Returning a welcome message
app.get("/", (_req, res) => {
  res.send("<h1> Welcome to SuperFlix ! </h1>");
});

app.post('/', (req, res) => {
	res.json({success: 'success', cx: process.env.CONNECTION_URI})
})

app.put('/', (req, res) => {
	res.send({success: 'success'})
})
app.delete('/', (req, res) => {
	res.send({success: 'success'})
})



// Error handler
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log("SuperFlix is listening on Port " + port);
});
module.exports = app;

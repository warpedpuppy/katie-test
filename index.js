
const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("uuid");

const { check, validationResult } = require("express-validator");


const app = express();

const cors = require("cors");
let allowedOrigins = ['http://localhost:3000', 'https://superlative-snickerdoodle-531b46.netlify.app'];

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

const mongoose = require("mongoose");
const Models = require("./models.js");

const Movies = Models.Movie;
const Users = Models.User;

//mongoose.connect('mongodb://localhost:27017/superFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });
let connected = "connecting";
mongoose.connect(
  process.env.CONNECTION_URI || "mongodb://localhost:27017/superFlixDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(res => console.log('connected to db'))
.catch(res => console.log('error connecting to db'))


app.post('/', (req, res) => {
	res.json({success: 'success', connected})
})

app.put('/', (req, res) => {
	res.send({success: 'success', connected})
})
app.delete('/', (req, res) => {
	res.send({success: 'success', connected})
})
app.get('/', async (req, res) => {
	let movies = await Movies.find();
	res.send({success: 'success', connected, movies})
})

app.listen(8080, () => console.log('success'))
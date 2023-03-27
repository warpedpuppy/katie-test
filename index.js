const express = require('express');

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
let connected = "not connected";
mongoose.connect(
  process.env.CONNECTION_URI || "mongodb://localhost:27017/superFlixDB",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(res => connected = "connected")
.catch(res => connected = "error")


app.post('/', (req, res) => {
	res.json({success: 'success', connected})
})

app.put('/', (req, res) => {
	res.send({success: 'success', connected})
})
app.delete('/', (req, res) => {
	res.send({success: 'success', connected})
})
app.get('/', (req, res) => {
	res.send({success: 'success', connected})
})

app.listen(8080, () => console.log('success'))
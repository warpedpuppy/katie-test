const express = require('express');

const app = express();

const cors = require("cors");
let allowedOrigins = ['http://localhost:3000', 'http://localhost:4200', 'https://superlative-snickerdoodle-531b46.netlify.app'];

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

app.post('/users', (req, res) => {
	res.send('success')
})

app.get('/', (req, res) => {
	res.send('success')
})

app.listen(8080, () => console.log('success'))
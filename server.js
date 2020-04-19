const express = require('express');
const connectDB = require('./config/db');

//Global variables
const app = express();
const PORT = process.env.PORT || 5000;

//Connect to Mongo DB
connectDB();

app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(PORT, () =>
  console.log(
    `Server started on port ${PORT}. Link is http://localhost:${PORT}`
  )
);

const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes');
//Global variables
const app = express();
const PORT = process.env.PORT || 5000;

//Connect to Mongo DB
connectDB();

//Init Middleware
app.use(express.json()); //Get req.body in POST/PUT requests

app.get('/', (req, res) => {
  res.send('API Running');
});

//Define routes
app.use(routes);

app.listen(PORT, () =>
  console.log(
    `Server started on port ${PORT}. Link is http://localhost:${PORT}`
  )
);

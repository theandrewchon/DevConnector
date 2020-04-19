const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes');
//Global variables
const app = express();
const PORT = process.env.PORT || 5000;

//Connect to Mongo DB
connectDB();

app.get('/', (req, res) => {
  res.send('API Running');
});

//Define API routes
app.use(routes);

app.listen(PORT, () =>
  console.log(
    `Server started on port ${PORT}. Link is http://localhost:${PORT}`
  )
);

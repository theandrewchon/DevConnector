const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    /* Connection to MongoDB Atlas cloud server */
    // await mongoose.connect(db, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    /* Connection for Heroku or Local MongoDB Server */
    await mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost/hubconnectdb',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      }
    );
    console.log('---------- \n MongoDB connected\n----------');
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

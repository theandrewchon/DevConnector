const mongoose = require('mongoose');
const constants = require('./constants');

const connectDB = async () => {
	try {
		/* Connection to MongoDB server */
		await mongoose.connect(
			constants.mongoURI || 'mongodb://localhost/DevConnector',
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

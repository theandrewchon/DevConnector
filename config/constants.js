require('dotenv').config();

module.exports = {
	mongoURI: process.env.MONGODB_URI,
	jwtSecret: process.env.JWT_SECRET,
	githubToken: process.env.GITHUB_TOKEN,
};

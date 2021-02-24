const jwt = require('jsonwebtoken');
const constants = require('../config/constants');

module.exports = function (req, res, next) {
	//Get token from header
	const token = req.header('x-auth-token');

	//Check if no token
	if (!token) {
		return res.status(401).json({ msg: 'No token, authorization denied' });
	}

	//Verify Token
	try {
		const decoded = jwt.verify(token, constants.jwtSecret);

		req.user = decoded.user;
		next();
	} catch {
		res.status(401).json({ msg: 'Invalid token' });
	}
};

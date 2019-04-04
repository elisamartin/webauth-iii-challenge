const jwt = require('jsonwebtoken');
const secret = 'This is a secret';

module.exports = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		jwt.verify(token, 'secret', (error, decodedToken) => {
			if (error) {
				res.status(401).json({ message: 'Not authorized' });
			} else {
				req.decodedToken = decodedToken;
				next();
			}
		});
	} else {
		res.status(400).json({ message: 'No credentials provided' });
	}
};

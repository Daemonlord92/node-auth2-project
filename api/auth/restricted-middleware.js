const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

module.exports = (req, res, next) => {

	try {
		const token = req.headers.authorization ?
			req.headers.authorization.split(' ')[1] :
			'';

		if (token) {
			jwt.verify(token, secret, (err, decodedToken) => {
				if (err) {
					next({
						statusCode: 401,
						message: 'invalid or missing credentials'
					});
				} else {
					req.decodedToken = decodedToken;
					next();
				}
			});
		} else {
			next({
				statusCode: 401,
				message: 'invalid or missing credentials'
			});
		}
	} catch (err) {
		next({
			statusCode: 500,
			message: 'error validating credentials',
			...err
		});
	}


};
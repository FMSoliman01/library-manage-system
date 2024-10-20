const jwt =require ('jsonwebtoken');
const createError = require('http-errors');

const verifyToken = (req, _res, next) => {
    try {
        // Attempt to get the token from request headers (supporting different case variations) or from query parameters
        const authorizationHeader = req.headers.authentication || req.headers.Authentication || req.query.token;

        if (!authorizationHeader) {
            throw createError.Unauthorized('Access token not provided'); // If token is missing, throw unauthorized error
        }

        // Extract the token assuming it follows the "Bearer" format
        const token = authorizationHeader.split(' ')[1];

        if (!token) {
            throw createError.Unauthorized('Token format is invalid'); // If token is not in proper format, throw an error
        }

        // Verify the token using the secret key from environment variables
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        // Store the decoded token in the request object to make it accessible in the next middleware or route
        req.user = {
            accessToken: decoded,
        };

        next(); // Proceed to the next middleware or route
    } catch (error) {
        // If the token has expired, send an appropriate message
        if (error.name === 'TokenExpiredError') {
            return next(createError.Unauthorized('Access token expired'));
        }
        
        // Log and handle other errors related to token verification
        console.log('Error while verifying the token: ', error);
        next(error);
    }
};

export default verifyToken;

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader =
      req.headers.authorization || req.headers.Authorization;
    if (!authorizationHeader) {
      return res.status(403).json({ message: `Invalid token` });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: `Invalid token` });
    }

    // Verifying the token 
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded;

    next(); 
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: `Token expired` });
    }

    //handle errors related to token verification
    console.log("Error while verifying the token: ", error);
    next(error);
  }
};

module.exports = verifyToken;

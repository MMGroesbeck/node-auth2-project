const jwt = require("jsonwebtoken");

const secrets = require("../api/secrets.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = secrets.jwtSecret;
  if (token) {
    jwt.verify(token, secret, function (err, decoded) {
        if (err) {
          res.status(401).json({ message: "Authentication failed.", err });
        } else {
          req.decodedToken = decoded;
          next();
        }
      });
  } else {
      res.status(400).json({message: "Please provide token." });
  }

};
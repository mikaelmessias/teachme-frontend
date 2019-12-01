const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if(!authorization) { 
    return res.status(400).send({
      error: "No token provided"
    });
  }  

  await jwt.verify(authorization, "secret", function(err, decoded) {
    if(!err) {
      req.decoded = decoded;
      next();
    }
    else {
      return res.status(401).send({
        error: "Token invalid"
      });
    }
  });
}
const jwt = require("jsonwebtoken");
const result = require("../tools/common");

const SECRET_KEY = process.env.SECRET_KEY;

const generateToken = (data) => {
  return jwt.sign(data, SECRET_KEY, { expiresIn: "24h" });
};

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return result.error(res, "No Token Provided", 401);
  }

  if (token.startsWith("Bearer ")) {
    token = token.split(" ")[1]; // ambil hanya token
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      return result.error(res, "Failed To Authentication Token!", 403);
    }

    req.user = decoded;
    next();
  });
};

const accessControl = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
};

module.exports = {
  generateToken,
  verifyToken,
  accessControl,
};

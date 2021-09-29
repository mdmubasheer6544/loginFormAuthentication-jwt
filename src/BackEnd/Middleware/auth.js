const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    res.formData = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Auth Failed of Auth",
    });
  }
};

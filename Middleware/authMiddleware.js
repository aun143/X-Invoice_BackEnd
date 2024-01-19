const jwt = require("jsonwebtoken");
const { userModel } = require("../Models/loginModel");

const protectRoutes = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return res.sendStatus(401); // Unautorized
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
      if (err && err.message == "jwt expired") return res.sendStatus(401);
      if (err) return res.sendStatus(401);

      const userExist = await userModel.findOne({ _id: user._id });
      if (!userExist) return res.sendStatus(401);

      req.user = userExist;
      next();
    });
  } catch (error) {
    res.sendStatus(401);
  }
};

module.exports = { protectRoutes };

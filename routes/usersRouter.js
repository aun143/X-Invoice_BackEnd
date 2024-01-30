const express = require("express");
const router = express.Router();
const {
  createUser,
  forgotPassword,
  getAllLoginUser,
  deleteLoginUser,
  updateLoginUser,
  LoginUser,
  getProfile,
} = require("../Controllers/usersController");
const { protectRoutes } = require("../Middleware/authMiddleware");

router.post("/createUser", createUser);
router.post("/loginUser", LoginUser);
router.get("/getLoginUser", getAllLoginUser);
router.post("/userforgotpassword", forgotPassword);
router.delete("/deleteLoginUser/:id", deleteLoginUser);
router.put("/updateLoginUser/:id", updateLoginUser);

router.use(protectRoutes);
router.get("/me", getProfile);
module.exports = {
  usersRouter: router,
};

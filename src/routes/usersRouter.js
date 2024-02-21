const express = require("express");
const router = express.Router();
const {
  createUser,
  forgotPassword,
  getAllUser,
  deleteUser,
  updateUser,
  LoginUser,
  getProfile,
} = require("../Controllers/usersController");
const { protectRoutes } = require("../Middleware/authMiddleware");

router.post("/createUser", createUser);
router.post("/loginUser", LoginUser);
router.get("/getLoginUser", getAllUser);
router.post("/userforgotpassword", forgotPassword);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);

router.use(protectRoutes);
router.get("/me", getProfile);
module.exports = {
  usersRouter: router,
};

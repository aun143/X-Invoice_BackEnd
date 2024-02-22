const express = require("express");
const router = express.Router();
const { sendEmailFile } = require("../controllers/emailController");
// const { protectRoutes } = require("../Middleware/authMiddleware");

// router.use(protectRoutes);
router.post("/send", sendEmailFile);

module.exports = { emailRouter: router };

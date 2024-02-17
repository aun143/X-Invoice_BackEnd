const express = require("express");
const router = express.Router();

const {
  createBusinessProfile,
  getAllBusinessProfile,
  deleteBusinessProfile,
  updateBusinessProfile,
  getBusinessProfileById,
} = require("../Controllers/businessController");
const { protectRoutes } = require("../Middleware/authMiddleware");
router.post("/postbusinessProfile", createBusinessProfile);

router.use(protectRoutes);
router.get("/getallbusinessProfile", getAllBusinessProfile);
router.delete("/deletebusinessProfile/:id", deleteBusinessProfile);
router.put("/updatebusinessProfile/:id", updateBusinessProfile);
router.get("/getBusinessProfile/:id", getBusinessProfileById);


module.exports = {
  businessRouter: router,
};

const express = require("express");
const router = express.Router();

const {
  createBusinessProfileOrganization,
  getAllBusinessProfileOrganization,
  deleteBusinessProfileOrganization,
  updateBusinessProfileOrganization,
} = require("../Controllers/businessControllerOrganization");
// const { protectRoutes } = require("../Middleware/authMiddleware");

// router.use(protectRoutes);
router.post("/postbusinessProfile", createBusinessProfileOrganization);
router.get("/getallbusinessProfile", getAllBusinessProfileOrganization);
router.delete("/deletebusinessProfile/:id", deleteBusinessProfileOrganization);
router.put("/updatebusinessProfile/:id", updateBusinessProfileOrganization);

module.exports = {
  businessRouterOrganization: router,
};

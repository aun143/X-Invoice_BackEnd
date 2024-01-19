const express = require("express");
const router = express.Router();

const {
  createBusinessProfileIndividual,
  getAllBusinessProfileIndividual,
  deleteBusinessProfileIndividual,
  updateBusinessProfileIndividual,
} = require("../Controllers/businessControllerIndividual");
// const { protectRoutes } = require("../Middleware/authMiddleware");

// router.use(protectRoutes);
router.post("/postbusinessProfile", createBusinessProfileIndividual);
router.get("/getallbusinessProfile", getAllBusinessProfileIndividual);
router.delete("/deletebusinessProfile/:id", deleteBusinessProfileIndividual);
router.put("/updatebusinessProfile/:id", updateBusinessProfileIndividual);

module.exports = {
  businessRouterIndividual: router,
};

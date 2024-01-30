const express = require("express");
const router = express.Router();
const {
  createNewClient,
  getAllClient,
  deleteClient,
  updateClient,
  getClientProfileById,
} = require("../Controllers/clinetController");
const { protectRoutes } = require("../Middleware/authMiddleware");

router.use(protectRoutes);


router.post("/createClient", createNewClient);
router.get("/getAllClient", getAllClient);
router.get("/getClient/:id", getClientProfileById);
router.delete("/deleteClient/:id", deleteClient);
router.put("/updateClient/:id", updateClient);

module.exports = {
  clientRouter: router,
};

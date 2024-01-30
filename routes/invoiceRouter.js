const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getAllInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoiceStatus,
  getSingleInvoice,
} = require("../Controllers/invoiveController");
const { protectRoutes } = require("../Middleware/authMiddleware");

router.use(protectRoutes);

router.post("/createInvoice", createInvoice);
router.get("/getAllInvoice", getAllInvoice);
router.get("/getInvoice/:id", getSingleInvoice);
router.delete("/deleteInvoice/:id", deleteInvoice);
router.put("/updateInvoice/:id", updateInvoice);
router.put("/updateInvoiceStatus/:id", updateInvoiceStatus);

module.exports = {
  invoiceRouter: router,
};

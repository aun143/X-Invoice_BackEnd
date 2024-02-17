const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getAllInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoiceStatus,
  getInvoiceById,
  updateUnpaidInvoiceStatus,
} = require("../Controllers/invoiveController");
router.put("/updateInvoiceStatus/:id", updateInvoiceStatus);
router.put("/updateUnpaidInvoiceStatus/:id", updateUnpaidInvoiceStatus);
const { protectRoutes } = require("../Middleware/authMiddleware");
router.use(protectRoutes);

router.post("/createInvoice", createInvoice);
router.get("/getAllInvoice", getAllInvoice);
router.get("/getInvoice/:id", getInvoiceById);
router.delete("/deleteInvoice/:id", deleteInvoice);
router.put("/updateInvoice/:id", updateInvoice);

module.exports = {
  invoiceRouter: router,
};

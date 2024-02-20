const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getAllInvoice,
  deleteInvoice,
  updateInvoice,
  updatePaidInvoiceStatus,
  getInvoiceById,
  updateUnpaidInvoiceStatus,
} = require("../Controllers/invoiveController");
router.put("/updatePaidInvoiceStatus/:id", updatePaidInvoiceStatus);
router.put("/updateUnpaidInvoiceStatus/:id", updateUnpaidInvoiceStatus);
router.put("/updateInvoice/:id", updateInvoice);
const { protectRoutes } = require("../Middleware/authMiddleware");
router.use(protectRoutes);

router.post("/createInvoice", createInvoice);
router.get("/getAllInvoice", getAllInvoice);
router.get("/getInvoice/:id", getInvoiceById);
router.delete("/deleteInvoice/:id", deleteInvoice);

module.exports = {
  invoiceRouter: router,
};

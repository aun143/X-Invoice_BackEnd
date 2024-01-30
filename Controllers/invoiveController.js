const { InvoiceDetail } = require("../Models/invoiceModel");
const validStatusValues = ["pending", "paid", "unpaid"];

const createInvoice = async (req, res) => {
  try {
    const user = req.user._id;
    req.body.user = user;
    const newinvoice = await InvoiceDetail.create(req.body);
    res.status(200).send(newinvoice);
    //console.log("Newinvoice", newinvoice);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Invoice.",
    });
  }
};

const getAllInvoice = async (req, res) => {
  try {
    const invoices = await InvoiceDetail.find();

    res.status(200).send(invoices);
    // //console.log("Get All InvoiceDetail", invoices);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving Invoice .",
    });
  }
};
const getSingleInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const invoice = await InvoiceDetail.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({
        message: "Invoive Not  found with This id " , invoiceId,
      });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error("Error retrieving Invoive: ", error);
    res.status(500).json({
      message: "Internal server error while retrieving the Invoive.",
    });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const deletedinvoice = await InvoiceDetail.findByIdAndDelete(invoiceId);

    if (!deletedinvoice) {
      return res
        .status(404)
        .send({ message: "invoice not found for deletion." });
    }

    res.status(200).send(deletedinvoice);
    //console.log("Deleted invoice", deletedinvoice);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while deleting the Invoice .",
    });
  }
};

const updateInvoiceStatus = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const updateData = req.body;

    // Check if the provided status is a valid status value
    if (updateData.status && !validStatusValues.includes(updateData.status)) {
      return res.status(400).send({ message: "Invalid status value." });
    }

    const updatedinvoice = await InvoiceDetail.findByIdAndUpdate(
      invoiceId,
      updateData,
      { new: true }
    );

    if (!updatedinvoice) {
      return res.status(404).send({ message: "invoice not found for update." });
    }

    res.status(200).send(updatedinvoice);
    //console.log("Updated invoice", updatedinvoice);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while updating the Invoice .",
    });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const invoiceId = req.params.id;
    const updateData = req.body;

    const updatedinvoice = await InvoiceDetail.findByIdAndUpdate(
      invoiceId,
      updateData,
      { new: true }
    );

    if (!updatedinvoice) {
      return res.status(404).send({ message: "invoice not found for update." });
    }

    res.status(200).send(updatedinvoice);
    //console.log("Updated invoice", updatedinvoice);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while updating the Invoice .",
    });
  }
};
module.exports = {
  createInvoice,
  getSingleInvoice,
  getAllInvoice,
  deleteInvoice,
  updateInvoiceStatus,
  updateInvoice,
};

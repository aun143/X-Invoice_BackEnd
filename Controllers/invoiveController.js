const { InvoiceDetail } = require("../Models/invoiceModel");
const validStatusValues = ["pending", "paid", "unpaid"];

const createInvoice = async (req, res) => {
  try {
    const newRecord = await InvoiceDetail.create(req.body);

    res.status(200).send(newRecord);
    //console.log("NewRecord", newRecord);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Invoice.",
    });
  }
};

const getAllInvoice = async (req, res) => {
  try {
    const records = await InvoiceDetail.find();

    res.status(200).send(records);
    // //console.log("Get All InvoiceDetail", records);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while retrieving Invoice .",
    });
  }
};




const deleteInvoice = async (req, res) => {
  try {
    const recordId = req.params.id;
    const deletedRecord = await InvoiceDetail.findByIdAndDelete(recordId);

    if (!deletedRecord) {
      return res
        .status(404)
        .send({ message: "Record not found for deletion." });
    }

    res.status(200).send(deletedRecord);
    //console.log("Deleted Record", deletedRecord);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while deleting the Invoice .",
    });
  }
};

const updateInvoiceStatus = async (req, res) => {
  try {
    const recordId = req.params.id;
    const updateData = req.body;

    // Check if the provided status is a valid status value
    if (updateData.status && !validStatusValues.includes(updateData.status)) {
      return res.status(400).send({ message: "Invalid status value." });
    }

    const updatedRecord = await InvoiceDetail.findByIdAndUpdate(
      recordId,
      updateData,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).send({ message: "Record not found for update." });
    }

    res.status(200).send(updatedRecord);
    //console.log("Updated Record", updatedRecord);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while updating the Invoice .",
    });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const recordId = req.params.id;
    const updateData = req.body;

    const updatedRecord = await InvoiceDetail.findByIdAndUpdate(
      recordId,
      updateData,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).send({ message: "Record not found for update." });
    }

    res.status(200).send(updatedRecord);
    //console.log("Updated Record", updatedRecord);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while updating the Invoice .",
    });
  }
};
module.exports = {
  createInvoice,
  getAllInvoice,
  deleteInvoice,
  updateInvoiceStatus,
  updateInvoice,
};

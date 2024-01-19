const {
  BusinessProfileOrganization,
} = require("../Models/businessProfileOrganization");
const createBusinessProfileOrganization = async (req, res) => {
  try {
    const newRecord = await BusinessProfileOrganization.create(req.body);
    res.status(200).send(newRecord);
    // //console.log("NewRecord", newRecord);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while creating the business profile.",
    });
  }
};

const getAllBusinessProfileOrganization = async (req, res) => {
  try {
    const records = await BusinessProfileOrganization.find();

    res.status(200).send(records);
    //console.log("Get All BusinessProfiles", records);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while retrieving business profiles.",
    });
  }
};

const deleteBusinessProfileOrganization = async (req, res) => {
  try {
    const recordId = req.params.id; 
    const deletedRecord = await BusinessProfileOrganization.findByIdAndDelete(recordId);

    if (!deletedRecord) {
      return res.status(404).send({ message: "Record not found for deletion." });
    }

    res.status(200).send(deletedRecord);
    //console.log("Deleted Record", deletedRecord);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the business profile.",
    });
  }
};

const updateBusinessProfileOrganization = async (req, res) => {
  try {
    const recordId = req.params.id; 
    const updateData = req.body;

    const updatedRecord = await BusinessProfileOrganization.findByIdAndUpdate(recordId, updateData, { new: true });

    if (!updatedRecord) {
      return res.status(404).send({ message: "Record not found for update." });
    }

    res.status(200).send(updatedRecord);
    //console.log("Updated Record", updatedRecord);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating the business profile.",
    });
  }
};


module.exports = {
  createBusinessProfileOrganization,
  getAllBusinessProfileOrganization,
  deleteBusinessProfileOrganization,
  updateBusinessProfileOrganization,
};

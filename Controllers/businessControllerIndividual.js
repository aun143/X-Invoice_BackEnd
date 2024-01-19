const {
  BusinessProfileIndividual,
} = require("../Models/businessProfileIndividual");


const createBusinessProfileIndividual = async (req, res) => {
  try {
    const newRecord = await BusinessProfileIndividual.create(req.body);
    res.status(200).send(newRecord);
    
    // console.log("NewRecord", newRecord);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while creating the business profile.",
    });
  }
};

const getAllBusinessProfileIndividual = async (req, res) => {
  try {
    const records = await BusinessProfileIndividual.find();

    res.status(200).send(records);
    // console.log("Get All BusinessProfiles", records);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while retrieving business profiles.",
    });
  }
};

const deleteBusinessProfileIndividual = async (req, res) => {
  try {
    const recordId = req.params.id; 
    const deletedRecord = await BusinessProfileIndividual.findByIdAndDelete(recordId);

    if (!deletedRecord) {
      return res.status(404).send({ message: "Record not found for deletion." });
    }

    res.status(200).send(deletedRecord);
    // console.log("Deleted Record", deletedRecord);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting the business profile.",
    });
  }
};

const updateBusinessProfileIndividual = async (req, res) => {
  try {
    const recordId = req.params.id; 
    const updateData = req.body;

    const updatedRecord = await BusinessProfileIndividual.findByIdAndUpdate(recordId, updateData, { new: true });

    if (!updatedRecord) {
      return res.status(404).send({ message: "Record not found for update." });
    }

    res.status(200).send(updatedRecord);
    // console.log("Updated Record", updatedRecord);
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating the business profile.",
    });
  }
};


module.exports = {
  createBusinessProfileIndividual,
  getAllBusinessProfileIndividual,
  deleteBusinessProfileIndividual,
  updateBusinessProfileIndividual,
};

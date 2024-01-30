const { ClientDetail } = require("../Models/clinetModel");

const createNewClient = async (req, res) => {
  try {
    const newRecord = await ClientDetail.create(req.body);

    res.status(200).send(newRecord);
    //console.log("Create ClientDetail ", newRecord);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the Invoice.",
    });
  }
};

// const getAllClient = async (req, res) => {
//   try {
//     const records = await ClientDetail.find();

//     res.status(200).send(records);
//   } catch (error) {
//     res.status(500).send({
//       message:
//         error.message ||
//         "Some error occurred while retrieving business profiles.",
//     });
//   }
// };

const getAllClient = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Current page (default to 1)
    const pageSize = parseInt(req.query.pageSize) || 5; // Number of items per page (default to 10)

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const records = await ClientDetail.find().skip(startIndex).limit(pageSize);

    res.status(200).send({
      page,
      pageSize,
      totalItems: records.length, // You may want to use total count from a separate query for better accuracy
      totalPages: Math.ceil(records.length / pageSize),
      data: records,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while retrieving business profiles.",
    });
  }
};

const getClientProfileById = async (req, res) => {
  try {
    const profileId = req.params.id;
    const record = await ClientDetail.findById(profileId);
    if (!record) {
      return res.status(404).json({
        message: "Client profile not found with id " + profileId,
      });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error("Error retrieving client profile: ", error);
    res.status(500).json({
      message: "Internal server error while retrieving the client profile.",
    });
  }
};
const deleteClient = async (req, res) => {
  try {
    const recordId = req.params.id;
    const deletedRecord = await ClientDetail.findByIdAndDelete(recordId);

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
        "Some error occurred while deleting the business profile.",
    });
  }
};
const updateClient = async (req, res) => {
  try {
    const recordId = req.params.id;
    const updateData = req.body;

    const updatedRecord = await ClientDetail.findByIdAndUpdate(
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
        "Some error occurred while updating the business profile.",
    });
  }
};

module.exports = {
  createNewClient,
  getAllClient,
  getClientProfileById,
  deleteClient,
  updateClient,
};

const { ClientDetail } = require("../Models/clinetModel");

// const createNewClient = async (req, res) => {
//   try {
//     const user=req.user._id;
//     req.body.user=user;
//     const newRecord = await ClientDetail.create(req.body);

//     res.status(200).send(newRecord);
//     //console.log("Create ClientDetail ", newRecord);
//   } catch (error) {
//     res.status(500).send({
//       message:
//         error.message || "Some error occurred while creating the Invoice.",
//     });
//   }
// };

const createNewClient = async (req, res) => {
  try {
    const user = req.user._id;
    req.body.user = user;

    // Determine the clientType based on the request body
    const clientType = req.body.clientType;
    if (!clientType || !["individual", "organization"].includes(clientType)) {
      return res.status(400).send({ message: "Invalid client type provided." });
    }
    console.log("clientType: ", clientType);
    // Create the new client record
    const newRecord = await ClientDetail.create(req.body);
    res.status(200).send(newRecord);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while creating the client.",
    });
  }
};
const getAllClient = async (req, res) => {
  try {
    const userId = req.user._id;

    const allClient = await ClientDetail.find({ user: userId });
    const page = parseInt(req.query.page) || 1; 
    const pageSize = parseInt(req.query.pageSize) || 5; 

    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;

    const paginatedRecords = allClient.slice(startIndex, endIndex);

    res.status(200).send({
      page,
      pageSize,
      totalItems: allClient.length, 
      totalPages: Math.ceil(allClient.length / pageSize),
      data: paginatedRecords,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while retrieving clients.",
    });
  }
};

// const getAllClient = async (req, res) => {
//   try {
    // const user = req.user._id;

    // const records = await ClientDetail.find({ user: user });

//     res.status(200).send(records);
//   } catch (error) {
//     res.status(500).send({
//       message:
//         error.message ||
//         "Some error occurred while retrieving business profiles.",
//     });
//   }
// };

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

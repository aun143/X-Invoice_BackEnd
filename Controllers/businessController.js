const { BusinessProfile } = require("../Models/businessProfile");
const { userModel } = require("../Models/usersModel");

const createBusinessProfile = async (req, res) => {
  try {
    const { userId, profileBody } = req.body;
    const requiredFields = ['firstName', 'lastName', 'phone', 'email'];

    for (const field of requiredFields) {
      if (!profileBody[field]) {
        return res.status(400).json({ type: "bad", message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` });
      }
    }
    if (!/^[a-zA-Z]+$/.test(profileBody.firstName)) {
      return res.status(400).json({ type: "bad", message: "firstName must contain only letters from A-Z and a-z" });
    }
    if (!/^[a-zA-Z]+$/.test(profileBody.lastName)) {
      return res.status(400).json({ type: "bad", message: "lastName must contain only letters from A-Z and a-z" });
    }
    if (!isValidEmail(profileBody.email)) {
      return res.status(400).json({ type: "bad", message: "Email must be valid and contain '@'" });
    }

    const singleUser = await userModel.findById(userId);

    if (
      singleUser &&
      !singleUser.individualProfile &&
      !singleUser.organizationProfile
    ) {
      profileBody.profileType = "individual";
      const newIndividualProfile = await BusinessProfile.create(profileBody);

      profileBody.profileType = "organization";

      const newOrganizationProfile = await BusinessProfile.create(profileBody);

      singleUser.individualProfile = newIndividualProfile._id;
      singleUser.organizationProfile = newOrganizationProfile._id;

      await singleUser.save();

      const populatedUser = await userModel
        .findById(userId)
        .populate("individualProfile")
        .populate("organizationProfile")
        .exec();

      return res.status(200).send(populatedUser);
    } else {
      return res.status(404).json({
        message:
          "User not found or userId is invalid or This User Profile Is Already Exist.",
      });
    }
  } catch (error) {
    return res.status(500).send({
      message:
        error.message ||
        "Some error occurred while creating the business profile.",
    });
  }
};

function isValidEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
}


const getAllBusinessProfile = async (req, res) => {
  try {
    const records = await BusinessProfile.find();

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

const getBusinessProfileById = async (req, res) => {
  try {
    const profileId = req.params.id;
    const record = await BusinessProfile.findById(profileId);
    if (!record) {
      return res.status(404).json({
        message: "Business profile not found with id " + profileId,
      });
    }

    res.status(200).json(record);
  } catch (error) {
    console.error("Error retrieving business profile: ", error);
    res.status(500).json({
      message: "Internal server error while retrieving the business profile.",
    });
  }
};

const deleteBusinessProfile = async (req, res) => {
  try {
    const recordId = req.params.id;
    const deletedRecord = await BusinessProfile.findByIdAndDelete(recordId);

    if (!deletedRecord) {
      return res
        .status(404)
        .send({ message: "Record not found for deletion." });
    }

    res.status(200).send(deletedRecord);
    // console.log("Deleted Record", deletedRecord);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while deleting the business profile.",
    });
  }
};

const updateBusinessProfile = async (req, res) => {
  try {
    const recordId = req.params.id;
    const updateData = req.body;

    const updatedRecord = await BusinessProfile.findByIdAndUpdate(
      recordId,
      updateData,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).send({ message: "Record not found for update." });
    }

    res.status(200).send(updatedRecord);
    // console.log("Updated Record", updatedRecord);
  } catch (error) {
    res.status(500).send({
      message:
        error.message ||
        "Some error occurred while updating the business profile.",
    });
  }
};

module.exports = {
  createBusinessProfile,
  getAllBusinessProfile,
  deleteBusinessProfile,
  updateBusinessProfile,
  getBusinessProfileById,
};

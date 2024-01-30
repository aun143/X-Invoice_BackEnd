const { userModel } = require("../Models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { hashPassword, generarteToken } = require("../helpers/user");

const createUser = async (req, res) => {
  try {
    const reqData = req.body;

    if (reqData.password) {
      reqData.password = await hashPassword(reqData.password);
    }
    const user = await userModel.findOne({ email: reqData.email });

    if (!user) {
      const data = await userModel.create(reqData);
      return res.status(200).json({
        type: "success",
        message: `Account created successfully`,
        data,
      });
    }

    return res
      .status(404)
      .json({ type: "bad", message: `email already exist!` });
  } catch (error) {
    throw error;
  }
};

const LoginUser = async (req, res) => {
  try {
    const reqData = req.body;
    const user = await userModel.findOne({ email: reqData.email });

    if (!user) {
      return res
        .status(404)
        .json({ type: "bad", message: `Invalid email or password!` });
    }
    const account = JSON.parse(JSON.stringify(user));
    const token = generarteToken(user);
    return res.status(200).json({
      type: "success",
      message: `Account Login successfull`,
      data: { ...account, access_token: token },
    });
  } catch (error) {
    throw error;
  }
};
console.log("LoginUser",LoginUser)
async function forgotPassword(req, res) {
  const { email, newPassword } = req.body;
  //console.log("Request User", req.body);
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    //console.log("user", user);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    //console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const getAllLoginUser = async (req, res) => {
  try {
    const records = await userModel.find();

    res.status(200).send(records);
    //console.log("Get All User", records);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving   ALl User.",
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = req.user;

    const records = await userModel
      .findById(user._id)
      .populate("individualProfile organizationProfile");

    res.status(200).send(records);
    //console.log("Get All User", records);
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving   ALl User.",
    });
  }
};

const deleteLoginUser = async (req, res) => {
  try {
    const recordId = req.params.id;
    const deletedRecord = await userModel.findByIdAndDelete(recordId);

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
        error.message || "Some error occurred while deleting the User profile.",
    });
  }
};

const updateLoginUser = async (req, res) => {
  try {
    const recordId = req.params.id;
    const updateData = req.body;

    const updatedRecord = await userModel.findByIdAndUpdate(
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
        error.message || "Some error occurred while updating the User profile.",
    });
  }
};

module.exports = {
  createUser,
  forgotPassword,
  getAllLoginUser,
  deleteLoginUser,
  updateLoginUser,
  LoginUser,
  getProfile,
};

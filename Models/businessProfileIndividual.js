const mongoose = require("mongoose");

const businessProfileIndividualSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: Number,
    required: false,
  },
  address1: {
    type: String,
    required: false,
  },
  address2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },

  companyName: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  websiteURL: {
    type: String,
    required: false,
  },
  taxId: {
    type: Number,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  faxNumber: {
    type: Number,
    required: false,
  },
  items: [
    {
      customFieldName: {
        type: String,
        required: false,
      },
      customFieldValue: {
        type: String,
        required: false,
      },
    },
  ],
  postalCode: {
    type: Number,
    required: false,
  },
});

const BusinessProfileIndividual = mongoose.model(
  "businessProfileIndividual",
  businessProfileIndividualSchema
);
module.exports = { BusinessProfileIndividual };

const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
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
  }, faxNumber: {
    type: Number,
    required: false,
  }, taxId: {
    type: Number,
    required: false,
  },
  address1: {
    type: String,
    required: false,
  },  notes: {
    type: String,
    required: false,
  },  
  address2: {
    type: String,
    required: false,
  },  websiteURL: {
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
  postalCode: {
    type: Number,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
   currency: {
    type: String,
    required: false,
  },
});

const ClientDetail = mongoose.model("ClienteDetail", ClientSchema);

module.exports = { ClientDetail };

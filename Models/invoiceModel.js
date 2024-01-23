const mongoose = require("mongoose");

const validStatusValues = ["Draft", "Paid", "Unpaid"];
const InvoiceSchema = new mongoose.Schema({
  description: {
    type: String,
    required: false,
  },
  language: {
    type: String,
    required: false,
  },
  currency: {
    type: String,
    required: false,
  },
  invoiceDueDate: {
    type: Number,
    required: false,
  },
  purchaseOrderNumber: {
    type: Number,
    required: false,
  },
  invoiceNumber: {
    type: String,
    unique: true,
    required: false,
  },
  detailDescription: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    required: false,
  },
  rate: {
    type: Number,
    required: false,
  },
  amount: {
    type: Number,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    default: "Draft",
    enum: validStatusValues,
    required: false,
  },

  reciever: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  sender: {
    type: String,
    required: false,
  },
  subtotal: {
    type: Number,
    required: false,
  },
  total: {
    type: Number,
    required: false,
    default: 0,
  },
  date: {
    type: Date,
    required: false,
  },

  invoiceName: {
    type: String,
    required: false,
  },
  items:[
 {   
  descriptions: {
      type: String,
      required: false,
    },
    quantity: {
      type: Number,
      required: false,
    },
    rate: {
      type: Number,
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: false,
    },
  }
  ],
});

const InvoiceDetail = mongoose.model("InvoiceDetail", InvoiceSchema);

module.exports = { InvoiceDetail };

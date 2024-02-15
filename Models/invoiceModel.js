const mongoose = require("mongoose");

const validStatusValues = ["Draft", "Paid", "Unpaid"];
const InvoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
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
  // individualProfile: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "BusinessProfile",
  //   required: false,
  //   default: null,
  // },

  receiver: {
    type: String,
    ref: "ClienteDetail",
    default: null,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  sender: {
    type: Object,
    ref: "BusinessProfile",
    default: null,
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
  items: [
    {
      description: {
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

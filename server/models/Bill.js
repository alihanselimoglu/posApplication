const mongoose = require("mongoose");

const BillSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerPhoneNumber: {
      type: String,
      required: true,
    },
    paymentMode: {
      type: String,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    cartItems: {
      type: Array,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("bills", BillSchema);

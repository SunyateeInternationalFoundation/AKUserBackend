const mongoose = require("mongoose");

const PaymentDetails = new mongoose.Schema(
  {
    paymentId: String,
    orderId: String,
    status: String,
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parents",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
const PaymentDetailsSchema = mongoose.model("payment", PaymentDetails);
module.exports = PaymentDetailsSchema;

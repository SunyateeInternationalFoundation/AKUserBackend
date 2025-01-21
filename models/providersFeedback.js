const mongoose = require("mongoose");

const Feedback = new mongoose.Schema(
  {
    review: { type: String, required: true },
    rating: { type: Number, required: true },
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "childrens",
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parents",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "providers",
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "servicebookings",
      required: true,
    },
  },
  { timestamps: true }
);
const ProvidersFeedbackSchema = mongoose.model("providersFeedback", Feedback);
module.exports = ProvidersFeedbackSchema;

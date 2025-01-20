const mongoose = require("mongoose");

const serviceBookingSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "childrens",
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "providers",
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
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
    status: { type: String, required: true },
    accepted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const ServiceBookings = mongoose.model("servicebookings", serviceBookingSchema);

module.exports = ServiceBookings;

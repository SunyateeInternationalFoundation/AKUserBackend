const mongoose = require("mongoose");
const FeedbackSchema = new mongoose.Schema({
  therapyFeedback: { type: String, default: "" },
  assignment: { type: String, default: "" },
});

const SessionSchema = new mongoose.Schema({
  sessionNumber: { type: Number, required: true },
  date: { type: Date },
  time: { type: String },
  status: {
    type: String,
    enum: ["completed", "pending", "ongoing", "cancelled"],
    default: "pending",
  },
  notes: { type: String, default: "" },
  feedback: { type: FeedbackSchema, default: () => ({}) },
  videoUrl: { type: String, default: "" },
});

const serviceBookingsSchema = new mongoose.Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "childrens",
      required: false,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "providers",
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "parents",
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "services",
      required: false,
    },

    accepted: {
      type: Boolean,
      default: false,
    },
    sessions: { type: [SessionSchema], default: [] },
  },
  { timestamps: true }
);
const ServiceBooking = mongoose.model("servicebookings", serviceBookingsSchema);

module.exports = ServiceBooking;

const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: false },
  city: { type: String, required: false },
  pincode: { type: String, required: false },
  verified: { type: Boolean, default: false },
  image: { type: String, required: false },
  password: { type: String, required: true },
});

const Parent = mongoose.model("parents", parentSchema);

module.exports = Parent;

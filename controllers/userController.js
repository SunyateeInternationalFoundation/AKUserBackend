const { Parent, Providers } = require("../models/parents");
const Children = require("../models/children");
const Service = require("../models/services");
const { ObjectId } = require("mongoose").Types;
const ServiceBookings = require("../models/serviceBookings");
const signUp = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (
    isStringInvalid(email) ||
    isStringInvalid(password) ||
    isStringInvalid(phone) ||
    isStringInvalid(name)
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const parentExist = await Parent.findOne({ email });
    if (parentExist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const newParent = new Parent({ name, email, password, phone });
    await newParent.save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: newParent,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (isStringInvalid(email) || isStringInvalid(password)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const parent = await Parent.findOne({ email });
    if (parent.password != password) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }
    res
      .status(200)
      .json({ success: true, message: "Logged in successfully", data: parent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const newChild = async (req, res) => {
  const {
    name,
    age,
    gender,
    parentEmail,
    basicInfo,
    medicalInfo,
    behavioralInfo,
    therapyHistory,
    parentId,
    admissionGoal,
  } = req.body;

  // if (isStringInvalid(name) || isStringInvalid(age) || isStringInvalid(gender) || isStringInvalid(parentEmail)) {
  //     return res.status(400).json({ message: 'All fields are required' });
  // }

  try {
    const newChild = new Children({
      name,
      age,
      gender,
      parentEmail,
      parentId: new ObjectId(parentId),
      basicInfo,
      extraDetails: {
        medicalInfo,
        behavioralInfo,
        therapyHistory,
        admissionGoal,
      },
    });

    const savedChild = await newChild.save();

    res.status(201).json({
      success: true,
      message: "Child registered successfully",
      data: savedChild,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getChildren = async (req, res) => {
  try {
    const children = await Children.find();
    res.status(200).json(children);
  } catch (error) {
    res.status(500).json({ message: "Error fetching children data", error });
  }
};

const isStringInvalid = (str) => {
  return !str || typeof str !== "string" || str.trim().length === 0;
};

const getParent = async (req, res) => {
  try {
    const { id } = req.params;
    const parent = await Parent.findById(id);

    if (!parent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    res.status(200).json({ success: true, data: parent });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateParent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, city, pincode } = req.body;

    const updatedParent = await Parent.findByIdAndUpdate(
      id,
      { name, email, phone, address, city, pincode },
      { new: true }
    );

    if (!updatedParent) {
      return res.status(404).json({ message: "Parent not found" });
    }

    res.status(200).json({
      success: true,
      message: "Parent updated successfully",
      data: updatedParent,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getServices = async (req, res) => {
  console.log("entered....");
  try {
    const services = await Service.find();
    if (!services.length) {
      return res
        .status(404)
        .json({ success: false, message: "No services found" });
    }
    // console.log("services", services);
    res.status(200).json({ success: true, data: services });
  } catch (err) {
    console.error("service Error", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
const getSelectedProviders = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const providers = await Providers.find({
      services: { $in: [objectId] },
    });
    console.log("providers", providers);
    return res.status(200).json({ success: true, data: providers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getSelectedChildren = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const children = await Children.find({
      parentId: objectId,
    });

    return res.status(200).json({ success: true, data: children });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const bookingTrial = async (req, res) => {
  try {
    const { serviceId, child, provider, date, time, parentId } = req.body;

    if (
      !child._id ||
      !provider._id ||
      !date ||
      !time ||
      !parentId ||
      !serviceId
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const serviceBooking = await ServiceBookings.create({
      childId: new ObjectId(child._id),
      providerId: new ObjectId(provider._id),
      date,
      time,
      parentId: new ObjectId(parentId),
      serviceId: new ObjectId(serviceId),
      status: "On Going",
      accepted: false,
    });

    if (!serviceBooking) {
      return res.status(404).json({ message: "Service booking not found" });
    }

    return res.status(200).json({ success: true, data: serviceBooking });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getBookingList = async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const bookingList = await ServiceBookings.find({ parentId: objectId })
      .populate("childId")
      .populate("providerId")
      .populate("serviceId");

    console.log("bookingList", bookingList);
    return res.status(200).json({ success: true, data: bookingList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
const getOneChild = async (req, res) => {
  try {
    const { id } = req.params;
    const child = await Children.findById(id);

    if (!child) {
      return res.status(404).json({ message: "Child not found" });
    }

    res.status(200).json({ success: true, data: child });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = {
  signUp,
  login,
  newChild,
  getChildren,
  getParent,
  updateParent,
  getServices,
  getSelectedProviders,
  getSelectedChildren,
  bookingTrial,
  getBookingList,
  getOneChild,
};

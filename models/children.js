const mongoose = require("mongoose");

const childrenSchema = new mongoose.Schema({
  name: { type: String, required: false },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "parents" },
  verified: { type: Boolean, default: false },
  image: { type: String, required: false },
  note: { type: String, required: false },
  basicInfo: {
    address: { type: String, required: false },
    childFullName: { type: String, required: false },
    dateOfBirth: { type: String, required: false },
    email: { type: String, required: false },
    gender: { type: String, required: false },
    parentGuardianName: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    preferredLanguage: { type: String, required: false },
    primaryContactName: { type: String, required: false },
    primaryPhone: { type: String, required: false },
    primaryRelationship: { type: String, required: false },
    secondaryContactName: { type: String, required: false },
    secondaryPhone: { type: String, required: false },
    secondaryRelationship: { type: String, required: false },
  },
  extraDetails: {
    medicalInfo: {
      dateOfDiagnosis: { type: String, required: false },
      diagnosingSpecialist: { type: String, required: false },
      coOccurringConditions: { type: String, required: false },
      allergies: { type: String, required: false },
      medications: { type: String, required: false },
      additionalNotes: { type: String, required: false },
    },
    behavioralInfo: {
      communicationSkills: { type: String, required: false },
      communicationDetails: { type: String, required: false },
      socialInteraction: { type: String, required: false },
      socialInteractionDetails: { type: String, required: false },
      sensoryPreferences: { type: String, required: false },
      sensoryDetails: { type: String, required: false },
    },
    therapyHistory: {
      schoolName: { type: String, required: false },
      gradeLevel: { type: String, required: false },
      speechTherapy: { type: Boolean, required: false },
      occupationalTherapy: { type: Boolean, required: false },
      aba: { type: Boolean, required: false },
      additionalTherapies: { type: String, required: false },
    },
    admissionGoal: {
      academicSupportGoal: { type: String, required: false },
      behavioralManagementGoal: { type: String, required: false },
      communicationGoal: { type: String, required: false },
      emergencyContactName: { type: String, required: false },
      emergencyContactRelationship: { type: String, required: false },
      parentGuardianGoals: { type: String, required: false },
      preferredTherapyModalities: { type: [String], required: false },
      reasonForAdmission: { type: String, required: false },
      sensoryIntegrationGoal: { type: String, required: false },
      socialSkillsGoal: { type: String, required: false },
    },
  },
});

const Children = mongoose.model("childrens", childrenSchema);

module.exports = Children;

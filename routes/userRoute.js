const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.signUp);
router.post("/login", userController.login);
router.post("/new-child", userController.newChild);
router.put("/update-child/:id", userController.updateChild);
router.get("/getChildren", userController.getChildren);
router.get("/:id", userController.getParent);
router.put("/:id", userController.updateParent);
router.get("/getProviders/:id", userController.getSelectedProviders);
router.get("/get-children/:id", userController.getSelectedChildren);
router.post("/booking-trail", userController.bookingTrial);
router.get("/bookings/:id", userController.getBookingList);
router.get("/child-details/:id", userController.getOneChild);
router.post("/providers-feedback", userController.createProvidersFeedback);
router.get("/get-sessions/:id", userController.getSessions);

module.exports = router;

const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.get("/", paymentController.purchasepremium);
router.post("/", paymentController.updateTransactionStatus);

module.exports = router;

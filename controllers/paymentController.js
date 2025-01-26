const Razorpay = require("razorpay");
const Order = require("../models/paymentDetails");


const purchasepremium = async (req, res, next) => {
  try {
    const { childId, parentId, serviceAmount } = req.query;
    console.log("params", req.query);
    var rzp = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    const amount = serviceAmount * 100;

    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      Order.create({
        orderId: order.id,
        status: "PENDING",
        parentId,
        childId,
      })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          console.log("order creation error:", err);
          return res.status(500).json({ error: err });
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "Something went Wrong", error: err });
  }
};

const updateTransactionStatus = async (req, res, next) => {
  try {
    const { childId, parentId } = req.query;
    const { payment_id, order_id } = req.body;

    const order = await Order.findOne({ orderId: order_id });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    await order.updateOne({
      paymentId: payment_id,
      status: "SUCCESSFUL",
      parentId,
      childId,
    });

    res.status(202).json({
      success: true,
      message: "Transaction Successful",
    });
  } catch (err) {
    console.error(err);
    res
      .status(403)
      .json({ error: err.message, message: "Something went wrong" });
  }
};

module.exports = {
  purchasepremium,
  updateTransactionStatus,
};

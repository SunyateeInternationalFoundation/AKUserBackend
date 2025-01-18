require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoute");
const servicesRoutes = require("./routes/servicesRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
app.use(express.json());
app.use(cors());

app.use("/payment", paymentRoutes);
app.use("/services", servicesRoutes);
app.use("/", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Database connection error:", err));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

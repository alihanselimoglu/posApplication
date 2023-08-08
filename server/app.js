const { configDotenv } = require("dotenv");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const logger = require("morgan");

const connectDB = require("./db");
const categoryRouter = require("./routes/categoryRoute");
const productRouter = require("./routes/productRoute");
const billRouter = require("./routes/billRoute");
const authRouter = require("./routes/authRoute");
const userRouter = require("./routes/userRoute");

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use("/category", categoryRouter);
app.use("/product", productRouter);
app.use("/bill", billRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);

connectDB();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

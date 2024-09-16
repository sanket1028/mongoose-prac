const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routers/Product");

const app = express();

const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/presistent-revision-appdb"
    );
    console.log("successfully connected to the database");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

connectToDB();

app.use(express.json());

app.use(productRouter);

app.listen(3000, () => console.log("server is running on port 3000"));

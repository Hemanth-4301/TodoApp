const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const connectDB = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/todos").then(() => {
    console.log("mongoDB connected");
  });
};
connectDB();
const todoRoute = require("./routes/todoRoute");

app.use("/api/todo", todoRoute);

app.listen(5000, () => {
  console.log("server is running on port 5000");
});

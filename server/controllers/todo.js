const Todo = require("../models/Todo");
const express = require("express");

const router = express.Router();

router.get("/getall", async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.status(200).json({ todos });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { todo } = req.body;
    await Todo.create({ text: todo });
    res.status(200).json({ message: "todo added successfully" });
  } catch (e) {
    res.status(400).json({ message: "error while adding todo" });
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { todo } = req.body;
    await Todo.findByIdAndUpdate(id, { text: todo });
    res.status(200).json({ message: "todo updated successfully" });
  } catch (e) {
    res.status(400).json({ message: "error while updating the todo" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: "todo deleted successfully" });
  } catch (e) {
    res.status(400).json({ message: "error while updating the todo" });
  }
});

module.exports = router;

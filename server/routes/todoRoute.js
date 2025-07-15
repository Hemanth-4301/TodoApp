const express = require("express");
const router = express.Router();

const todoController = require("../controllers/todo");
module.exports = todoController;

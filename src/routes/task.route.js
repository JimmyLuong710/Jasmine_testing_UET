const express = require("express");
const Task = require("../models/task.model");

const taskRouter = express.Router();

taskRouter.post("/tasks", async (req, res) => {
  const taskDto = req.body;
  const createdTask = await Task.create(taskDto);

  res.status(201).json(createdTask);
});

module.exports = taskRouter;

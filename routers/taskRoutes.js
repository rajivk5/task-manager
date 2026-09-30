const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/tasks", getTasks);

router.post("/tasks", createTask);

router.get("/tasks/:id", getTaskById);

router.put("/tasks/:id", updateTask);

router.delete("/tasks/:id", deleteTask);

module.exports = router;

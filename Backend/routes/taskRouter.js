const express = require("express");
const router = express.Router();
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
  assignTask,
} = require("../controllers/taskController");

const { isAuthenticated } = require("../middlewares/auth");

router.post("/task", isAuthenticated, createTask);
router.get("/tasks", isAuthenticated, getAllTasks);
router.get("/task/:id", isAuthenticated, getTaskById);
router.put("/task/:id", isAuthenticated, updateTask);
router.delete("/task/:id", isAuthenticated, deleteTask);
router.post("/assign-task", isAuthenticated, assignTask);

module.exports = router;

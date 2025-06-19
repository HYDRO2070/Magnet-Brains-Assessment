const { catchAsyncErrors } = require("../middlewares/catchAsyncError");
const { default: Task } = require("../models/TaskModel");
const UserModel = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");

// Homepage
exports.homepage = catchAsyncErrors(async (req, res, next) => {
  res.json({ message: "Manager Home page" });
});

// CREATE Task - Admin Only
exports.createTask = catchAsyncErrors(async (req, res, next) => {
  // 1. Verify admin role (from your original task creation logic)
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admins can create tasks", 403));
  }

  // 2. Create the task
  const task = await new Task({
    ...req.body,
    createdBy: req.user.id, // Add the creator reference
  }).save();

  // 3. Update the user's tasks array (similar to your order example)
  const user = await UserModel.findByIdAndUpdate(
    req.user.id,
    { $push: { createdTasks: task._id } },
    { new: true }
  ).exec();

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    task,
    message: "Task created successfully",
  });
});

// READ All Tasks (Admin Only)
exports.getAllTasks = catchAsyncErrors(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = req.user.role === "admin" ? {} : { assignedTo: req.user._id };

  // Step 1: Fetch from DB sorted by dueDate only
  const [tasksRaw, totalTasks] = await Promise.all([
    Task.find(query)
      .populate("assignedTo", "username")
      .sort({ dueDate: 1 }) // Sort only by dueDate in DB
      .skip(skip)
      .limit(limit)
      .lean(),
    Task.countDocuments(query),
  ]);

  // Step 2: Custom priority order in JS
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  const tasks = tasksRaw
    .sort((a, b) => {
      const priorityDiff =
        priorityOrder[a.priority] - priorityOrder[b.priority];
      return priorityDiff;
    })
    .map((t) => ({
      ...t,
      assignedTo: t.assignedTo ? t.assignedTo.username : null,
    }));

  res.status(200).json({
    success: true,
    tasks,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(totalTasks / limit),
      totalTasks,
      limit,
    },
  });
});

// GET Task Details - Admin Only
exports.getTaskById = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admins can view task details", 403));
  }

  const task = await Task.findById(req.params.id);
  if (!task) return next(new ErrorHandler("Task not found", 404));

  res.status(200).json({ success: true, task });
});

// UPDATE Task - Admin Only
exports.updateTask = catchAsyncErrors(async (req, res, next) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) return next(new ErrorHandler("Task not found", 404));

  res.status(200).json({ success: true, task });
});

// User: Update only task status
exports.updateTaskStatus = catchAsyncErrors(async (req, res, next) => {
  const { taskId, status } = req.body;

  const task = await Task.findById(taskId);
  if (!task) return next(new ErrorHandler("Task not found", 404));

  if (String(task.assignedTo) !== String(req.user._id)) {
    return next(
      new ErrorHandler("You are not authorized to update this task", 403)
    );
  }

  task.status = status;
  await task.save();

  res.status(200).json({ success: true, message: "Task status updated", task });
});

// Admin: Assign task to user
exports.assignTask = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admins can assign tasks", 403));
  }

  const { taskIds, userId } = req.body; // Changed from taskId to taskIds (array)

  // Validate inputs
  if (!Array.isArray(taskIds)) {
    return next(new ErrorHandler("taskIds should be an array", 400));
  }

  if (taskIds.length === 0) {
    return next(new ErrorHandler("No task IDs provided", 400));
  }

  // Check if user exists
  const user = await UserModel.findById(userId);
  if (!user) return next(new ErrorHandler("User not found", 404));

  // Update all tasks at once
  const result = await Task.updateMany(
    { _id: { $in: taskIds } }, // Find all tasks with IDs in the array
    { $set: { assignedTo: userId } } // Set assignedTo for all matched tasks
  );

  if (result.modifiedCount === 0) {
    return next(new ErrorHandler("No tasks were updated", 400));
  }

  res.status(200).json({
    success: true,
    message: `${result.modifiedCount} task(s) assigned successfully`,
    modifiedCount: result.modifiedCount,
  });
});

// DELETE Task - Admin Only
exports.deleteTask = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Only admins can delete tasks", 403));
  }

  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return next(new ErrorHandler("Task not found", 404));

  res.status(200).json({ success: true, message: "Task deleted successfully" });
});

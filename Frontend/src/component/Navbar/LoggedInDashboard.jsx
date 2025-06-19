import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import {
  createTask,
  deleteTask,
  getAllTasks,
  loggedInUsers,
  updateTask,
} from "../../Services/apiservices";

const LoggedInDashboard = () => {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [updateTaskId, setUpdateTaskId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const fetchTask = async () => {
    try {
      const response = await getAllTasks(currentPage, limit);
      if (response.status === 200) {
        setTasks(response?.data?.tasks);
        setTotalPages(response?.data?.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch tasks");
    }
  };

  const [addForm, setAddForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
    priority: "medium",
  });

  const [updateForm, setUpdateForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "pending",
    priority: "medium",
  });

  const handleChange = (e, formSetter) => {
    const { name, value } = e.target;
    formSetter((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    if (!addForm.title || !addForm.dueDate || !addForm.priority) {
      toast.warning("Please fill all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createTask(addForm);
      if (response.status === 200) {
        toast.success("Task created successfully");
        setShowAddDialog(false);
        fetchTask();
        setAddForm({
          title: "",
          description: "",
          dueDate: "",
          status: "pending",
          priority: "medium",
        });
      } else {
        toast.error("Failed to create task. Please try again.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      toast.error("An error occurred while creating the task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!updateForm.status) {
      toast.warning("Please select a status.");
      return;
    }

    setIsSubmitting(true);

    try {
      const dataToUpdate =
        loggedInUser?.role === "admin"
          ? updateForm
          : { status: updateForm.status };

      const response = await updateTask(updateTaskId, dataToUpdate);
      if (response.status === 200) {
        toast.success("Task updated successfully");
        setShowUpdateDialog(false);
        fetchTask();
      } else {
        toast.error("Failed to update task.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error updating task.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await deleteTask(taskId);
        if (response.status === 200) {
          toast.success("Task deleted successfully");
          fetchTask();
        } else {
          toast.error("Failed to delete task.");
        }
      } catch (err) {
        console.log(err);
        toast.error("Error deleting task.");
      }
    }
  };

  const loggedInUserobj = async () => {
    try {
      const response = await loggedInUsers();
      if (response.status === 200) {
        setLoggedInUser(response?.data?.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50";
      case "medium":
        return "bg-yellow-50";
      case "low":
        return "bg-black";
      default:
        return "bg-white";
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [currentPage]);

  useEffect(() => {
    fetchTask();
    loggedInUserobj();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
          {loggedInUser?.role === "admin" && (
            <div className="space-x-4">
              <button
                onClick={() => setShowAddDialog(true)}
                className="bg-black text-white font-medium px-4 py-2 rounded"
              >
                Add Task
              </button>
            </div>
          )}
        </div>

        {/* Tasks Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded shadow-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Priority
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Due Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr
                  key={task._id}
                  className={`border-t ${getPriorityColor(task.priority)}`}
                >
                  <td className="px-4 py-2 text-gray-800">{task.title}</td>
                  <td className="px-4 py-2 text-gray-800 capitalize">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === "high"
                          ? "bg-red-100 text-red-800"
                          : task.priority === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-black text-white"
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-gray-800 capitalize">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.status === "completed"
                          ? "bg-black text-white"
                          : task.status === "in-progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => {
                        setUpdateTaskId(task._id);
                        setUpdateForm({
                          title: task.title,
                          description: task.description,
                          dueDate: task.dueDate.slice(0, 10),
                          status: task.status,
                          priority: task.priority,
                        });
                        setShowUpdateDialog(true);
                      }}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Update
                    </button>
                    {loggedInUser?.role === "admin" && (
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded bg-yellow-600 text-white ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-yellow-700"
            }`}
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded bg-yellow-600 text-white ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-yellow-700"
            }`}
          >
            Next
          </button>
        </div>
      </div>

      {showAddDialog && loggedInUser?.role === "admin" && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => !isSubmitting && setShowAddDialog(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">Add Task</h3>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              {renderForm(addForm, (e) => handleChange(e, setAddForm), false)}
              <DialogActions
                onCancel={() => !isSubmitting && setShowAddDialog(false)}
                isSubmitting={isSubmitting}
              />
            </form>
          </div>
        </div>
      )}

      {showUpdateDialog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowUpdateDialog(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              {loggedInUser?.role === "admin" ? "Update Task" : "Update Status"}
            </h3>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              {renderForm(
                updateForm,
                (e) => handleChange(e, setUpdateForm),
                loggedInUser?.role !== "admin"
              )}
              <DialogActions
                onCancel={() => setShowUpdateDialog(false)}
                isSubmitting={isSubmitting}
              />
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const renderForm = (formData, onChange, isDisabled = false) => (
  <>
    <div>
      <label className="block font-medium">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded ${
          isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        required
        disabled={isDisabled}
      />
    </div>
    <div>
      <label className="block font-medium">Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded ${
          isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        rows={3}
        disabled={isDisabled}
      />
    </div>
    <div>
      <label className="block font-medium">Due Date</label>
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded ${
          isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        required
        disabled={isDisabled}
      />
    </div>
    <div>
      <label className="block font-medium">Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded"
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
    <div>
      <label className="block font-medium">Priority</label>
      <select
        name="priority"
        value={formData.priority}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 rounded ${
          isDisabled ? "bg-gray-100 cursor-not-allowed" : ""
        }`}
        required
        disabled={isDisabled}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  </>
);

const DialogActions = ({ onCancel, isSubmitting = false }) => (
  <div className="flex justify-end space-x-4 pt-4">
    <button
      type="button"
      onClick={onCancel}
      disabled={isSubmitting}
      className={`px-4 py-2 rounded border border-gray-400 text-gray-700 hover:bg-gray-200 ${
        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      Cancel
    </button>
    <button
      type="submit"
      disabled={isSubmitting}
      className={`px-4 py-2 rounded bg-yellow-600 text-white hover:bg-yellow-700 ${
        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isSubmitting ? "Saving..." : "Save"}
    </button>
  </div>
);

export default LoggedInDashboard;

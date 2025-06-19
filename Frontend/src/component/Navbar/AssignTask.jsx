import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import {
  allUsers,
  assignTasksToUser,
  getAllTasks,
} from "../../Services/apiservices";

const AssignTask = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
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

  useEffect(() => {
    fetchTask();
  }, [currentPage]);

  useEffect(() => {
    fetchUsers();
    fetchTask();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await allUsers();
      if (response.status === 200) {
        setUsers(response?.data?.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (taskId) => {
    setSelectedTaskIds((prevSelected) => {
      if (prevSelected.includes(taskId)) {
        return prevSelected.filter((id) => id !== taskId);
      } else {
        return [...prevSelected, taskId];
      }
    });
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();

    if (selectedTaskIds.length === 0 || !selectedUserId) {
      toast.warning("Please select at least one task and a user.");
      return;
    }

    try {
      const response = await assignTasksToUser(selectedTaskIds, selectedUserId);
      if (response.status === 200) {
        toast.success(
          `${selectedTaskIds.length} task(s) assigned successfully`
        );
        fetchTask();
        setShowDialog(false);
        setSelectedUserId("");
        setSelectedTaskIds([]);
      }
    } catch (error) {
      toast.error("Failed to assign tasks");
      console.error(error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSelectedTaskIds([]);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedTaskIds([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Assign Task</h2>
          <button
            onClick={() => {
              if (selectedTaskIds.length === 0) {
                toast.warning("Please select at least one task first.");
                return;
              }
              setShowDialog(true);
            }}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-4 py-2 rounded"
          >
            Assign Task
          </button>
        </div>

        <div className="overflow-x-auto bg-white border rounded shadow-sm">
          <table className="min-w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">Select</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Priority</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Assigned To</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id} className="border-t">
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedTaskIds.includes(task._id)}
                      onChange={() => handleCheckboxChange(task._id)}
                    />
                  </td>
                  <td className="px-4 py-2">{task.title}</td>
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
                  <td className="px-4 py-2">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 capitalize">{task.status}</td>
                  <td className="px-4 py-2 capitalize">
                    {task?.assignedTo || "-"}
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

      {showDialog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowDialog(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-md w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-semibold mb-4 text-center">
              Assign {selectedTaskIds.length} Task(s) to User
            </h3>

            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <select
                value={selectedUserId}
                onChange={(e) => setSelectedUserId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                required
              >
                <option value="">-- Select a user --</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.username}
                  </option>
                ))}
              </select>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                >
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignTask;

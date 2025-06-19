import { useState, useEffect, useRef } from "react";

const Files = () => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [updatingFileId, setUpdatingFileId] = useState(null);

  useEffect(() => {
    const storedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    setFiles(storedFiles);
  }, []);

  useEffect(() => {
    localStorage.setItem("uploadedFiles", JSON.stringify(files));
  }, [files]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length === 0) return;

    if (updatingFileId !== null) {
      const updated = files.map((file) =>
        file.id === updatingFileId
          ? {
              name: selectedFiles[0].name,
              size: selectedFiles[0].size,
              type: selectedFiles[0].type,
              id: file.id,
            }
          : file
      );
      setFiles(updated);
      setUpdatingFileId(null);
    } else {
      const newFiles = selectedFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        id: Date.now() + Math.random(),
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }

    e.target.value = "";
  };

  const handleDelete = (id) => {
    const updated = files.filter((file) => file.id !== id);
    setFiles(updated);
  };

  const handleUpdate = (id) => {
    setUpdatingFileId(id);
    fileInputRef.current.click();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Files Page</h1>

      <input
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        className="bg-yellow-600 text-white px-4 py-2 rounded mb-4"
        onClick={() => {
          setUpdatingFileId(null);
          fileInputRef.current.click();
        }}
      >
        Add Files
      </button>

      {files.length > 0 ? (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">File Name</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td className="border p-2">{file.name}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => handleUpdate(file.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(file.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default Files;

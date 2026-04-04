import React, { useState } from "react";
import axios from "axios";

function CreateTask() {
  const [taskName, setTaskName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
//
    await axios.post("http://localhost:5000/api/tasks", {
      taskName,
    });

    alert("Task Created Successfully");
    setTaskName("");
  };

  return (
    <div className="card p-4 shadow">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Task Name</label>
          <input
            type="text"
            className="form-control"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;

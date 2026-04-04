import React, { useState, useEffect } from "react";
import axios from "axios";

function TaskForm({ fetchTasks, editTask, setEditTask }) {
  const [taskName, setTaskName] = useState("");
  const [steps, setSteps] = useState([
    { stepNumber: 1, description: "", image: null },
  ]);

  useEffect(() => {
    if (editTask) {
      setTaskName(editTask.taskName);
      setSteps(editTask.steps);
    }
  }, [editTask]);

  const addStep = () => {
    setSteps([
      ...steps,
      { stepNumber: steps.length + 1, description: "", image: null },
    ]);
  };

  const handleStepChange = (index, field, value) => {
    const updated = [...steps];
    updated[index][field] = value;
    setSteps(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("taskName", taskName);

    const stepData = steps.map((step) => ({
      stepNumber: step.stepNumber,
      description: step.description,
    }));

    formData.append("steps", JSON.stringify(stepData));

    if (editTask) {
      await axios.put(
        `http://localhost:5000/api/tasks/${editTask._id}`,
        formData
      );
    } else {
      await axios.post("http://localhost:5000/api/tasks", formData);
    }

    fetchTasks();
    setEditTask(null);
    window.location.reload(); // closes modal cleanly
  };

  return (
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

      {steps.map((step, index) => (
        <div key={index} className="card mb-3 p-3 border-primary">
          <h6>Step {index + 1}</h6>

          <textarea
            className="form-control mb-2"
            value={step.description}
            onChange={(e) =>
              handleStepChange(index, "description", e.target.value)
            }
            required
          />

          <input
            type="file"
            className="form-control"
            onChange={(e) =>
              handleStepChange(index, "image", e.target.files[0])
            }
          />
        </div>
      ))}

      <button
        type="button"
        className="btn btn-outline-primary me-2"
        onClick={addStep}
      >
        Add Step
      </button>

      <button type="submit" className="btn btn-success">
        {editTask ? "Update Task" : "Save Task"}
      </button>
    </form>
  );
}

export default TaskForm;

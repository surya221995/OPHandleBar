import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  // ✅ Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ Fetch all tasks with their steps
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  // ✅ Open modal instead of direct delete
  const handleDeleteClick = (stepId, taskId) => {
    setSelectedStep({ stepId, taskId });
    setShowModal(true);
  };

  // ✅ Confirm delete using the new endpoint
  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/steps/task/${selectedStep.taskId}/step/${selectedStep.stepId}`
      );

      // Update UI
      const updatedTasks = tasks.map((task) => {
        if (task.id === selectedStep.taskId) {
          return {
            ...task,
            Steps: task.Steps.filter(
              (step) => step.id !== selectedStep.stepId
            ),
          };
        }
        return task;
      });

      setTasks(updatedTasks);
      setShowModal(false);
      setSelectedStep(null);
    } catch (error) {
      console.error("Error deleting step:", error);
    }
  };

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="card p-3 mb-3 shadow">
          <h5 className="text-primary">{task.taskName}</h5>

          {task.Steps && task.Steps.length > 0 ? (
            task.Steps.map((step) => (
              <div key={step.id} className="border p-2 mb-2">
                <div className="d-flex justify-content-between">
                  <strong>Step {step.stepNumber}</strong>

                  {/* ✅ Delete Button */}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() =>
                      handleDeleteClick(step.id, task.id)
                    }
                  >
                    Delete
                  </button>
                </div>

                <p>{step.description}</p>

                {step.image && (
                  <img
                    src={`data:image/jpeg;base64,${step.image}`}
                    width="180"
                    alt="Step"
                    style={{ borderRadius: "5px" }}
                  />
                )}
              </div>
            ))
          ) : (
            <p className="text-muted">No steps available</p>
          )}
        </div>
      ))}

      {/* ✅ Modal */}
      {showModal && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">
                  Confirm Delete
                </h5>
              </div>

              <div className="modal-body">
                <p>Are you sure you want to delete this step?</p>
              </div>

              <div className="modal-footer">
                {/* Cancel */}
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedStep(null);
                  }}
                >
                  Cancel
                </button>

                {/* Confirm Delete */}
                <button
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewTasks;
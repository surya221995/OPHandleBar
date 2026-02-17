import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//
function AddSteps() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");
  const [steps, setSteps] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [stepData, setStepData] = useState({
    stepNumber: "",
    description: "",
    image: null,
    preview: "",
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const fetchSteps = async (taskId) => {
    if (!taskId) return;
    const res = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
    setSteps(res.data.Steps || []);
  };

  // ✅ Image Preview Handler (Fixed)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setStepData((prev) => ({
        ...prev,
        image: file,
        preview: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("stepNumber", stepData.stepNumber);
    formData.append("description", stepData.description);
    formData.append("image", stepData.image);
    formData.append("taskId", selectedTask);

    try {
      await axios.post("http://localhost:5000/api/steps", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchSteps(selectedTask);
      setShowModal(false);

      // Reset form
      setStepData({
        stepNumber: "",
        description: "",
        image: null,
        preview: "",
      });
    } catch (err) {
      console.error("Error adding step:", err);
    }
  };

  return (
    <div className="card p-4 shadow">
      <div className="mb-3">
        <label>Select Task</label>
        <select
          className="form-select"
          onChange={(e) => {
            setSelectedTask(e.target.value);
            fetchSteps(e.target.value);
          }}
        >
          <option value="">-- Select Task --</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.taskName}
            </option>
          ))}
        </select>
      </div>

      {selectedTask && (
        <>
          <Button
            variant="success"
            className="mb-3"
            onClick={() => setShowModal(true)}
          >
            Add Step
          </Button>

          {steps.map((step) => (
            <div key={step.id} className="border p-3 mb-2">
              <strong>Step {step.stepNumber}</strong>
              <p>{step.description}</p>

              {/* If backend returns base64 image */}
              {step.image && (
                <img
                  src={`data:image/png;base64,${step.image}`}
                  width="150"
                  alt="Step"
                />
              )}
            </div>
          ))}
        </>
      )}

      {/* ✅ React Bootstrap Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title>Add Step</Modal.Title>
        </Modal.Header>

        <Modal.Body>
  <div className="row">

    {/* LEFT SIDE */}
    <div className="col-md-7">
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Step Number"
          className="form-control mb-3"
          value={stepData.stepNumber}
          onChange={(e) =>
            setStepData({ ...stepData, stepNumber: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Description"
          className="form-control mb-3"
          value={stepData.description}
          onChange={(e) =>
            setStepData({ ...stepData, description: e.target.value })
          }
          required
        />

        <input
          type="file"
          className="form-control mb-3"
          accept="image/*"
          onChange={handleImageChange}
        />

        <Button type="submit" variant="primary" className="w-100">
          Save Step
        </Button>
      </form>
    </div>

    {/* RIGHT SIDE */}
    <div className="col-md-5 text-center">
      {stepData.preview ? (
        <img
          src={stepData.preview}
          alt="Preview"
          className="img-fluid rounded shadow"
          style={{
            maxHeight: "200px",
            objectFit: "cover"
          }}
        />
      ) : (
        <div className="text-muted mt-4">
          Image preview will appear here
        </div>
      )}
    </div>

  </div>
</Modal.Body>




      </Modal>
    </div>
  );
}

export default AddSteps;

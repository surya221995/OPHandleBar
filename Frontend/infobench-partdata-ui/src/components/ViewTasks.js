import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);
//
  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="card p-3 mb-3 shadow">
          <h5 className="text-primary">{task.taskName}</h5>

          {task.Steps && task.Steps.length > 0 ? (
            task.Steps.map((step) => (
              <div key={step.id} className="border p-2 mb-2">
                <strong>Step {step.stepNumber}</strong>
                <p>{step.description}</p>

                {/* ✅ Image from Database */}
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
    </>
  );
}

export default ViewTasks;

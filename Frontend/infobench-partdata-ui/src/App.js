import React, { useState } from "react";
import CreateTask from "./components/CreateTask";
import AddSteps from "./components/AddSteps";
import ViewTasks from "./components/ViewTasks";

function App() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">
        OPERATOR GUIDANCE SYSYTEM
      </h2>

      {/* Tabs */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "create" && "active"}`}
            onClick={() => setActiveTab("create")}
          >
            Create Task
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "steps" && "active"}`}
            onClick={() => setActiveTab("steps")}
          >
            Add Steps
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "view" && "active"}`}
            onClick={() => setActiveTab("view")}
          >
            View Tasks
          </button>
        </li>
      </ul>

      <div className="mt-4">
        {activeTab === "create" && <CreateTask />}
        {activeTab === "steps" && <AddSteps />}
        {activeTab === "view" && <ViewTasks />}
      </div>
    </div>
  );
}

export default App;

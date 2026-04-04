import React, { useState } from "react";
import CreateTask from "./components/CreateTask";
import AddSteps from "./components/AddSteps";
import ViewTasks from "./components/ViewTasks";

function App() {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <div className="container mt-4">
         <div className="text-center mb-4 p-4 rounded shadow-sm"
     style={{
       background: "linear-gradient(135deg, #007bff, #00c6ff)",
       color: "white"
     }}>
  <h1 className="fw-bold mb-1">Operator Guidance System</h1>
  <p className="mb-0">Manage tasks and guide operators efficiently</p>
</div>

      {/* Tabs */}
      {/* <ul className="nav nav-tabs">
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
      </ul> */}

       <ul className="nav nav-pills justify-content-center gap-3 mb-4">
  {[
    { key: "create", label: "➕ Create Task" },
    { key: "steps", label: "🪜 Add Steps" },
    { key: "view", label: "📋 View Tasks" },
  ].map((tab) => (
    <li className="nav-item" key={tab.key}>
      <button
        className={`nav-link px-4 py-2 fw-semibold ${
          activeTab === tab.key ? "active custom-active" : "custom-tab"
        }`}
        onClick={() => setActiveTab(tab.key)}
      >
        {tab.label}
      </button>
    </li>
  ))}
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

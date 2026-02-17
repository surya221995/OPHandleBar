const express = require("express");
const router = express.Router();
const { Task, Step } = require("../models");

// Create Task
router.post("/", async (req, res) => {
  try {
    const { taskName } = req.body;
    const task = await Task.create({ taskName });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks with steps (Base64 images)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ model: Step }],
      order: [["id", "ASC"]],
    });

    const tasksWithBase64 = tasks.map(task => {
      const formattedSteps = task.Steps.map(step => ({
        id: step.id,
        stepNumber: step.stepNumber,
        description: step.description,
        image: step.image ? step.image.toString("base64") : null
      }));

      return { ...task.toJSON(), Steps: formattedSteps };
    });

    res.json(tasksWithBase64);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single task with steps (Base64 images)
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id, {
      include: [{ model: Step }],
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    const formattedSteps = task.Steps.map(step => ({
      id: step.id,
      stepNumber: step.stepNumber,
      description: step.description,
      image: step.image ? step.image.toString("base64") : null
    }));

    res.json({ ...task.toJSON(), Steps: formattedSteps });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

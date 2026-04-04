// const express = require("express");
// const router = express.Router();
// const upload = require("../middlewares/multer"); // memory storage
// const { Step, Task } = require("../models");

// /* Add Step */
// router.post("/", upload.single("image"), async (req, res) => {
//   try {
//     const { taskId, stepNumber, description } = req.body;

//     const task = await Task.findByPk(taskId);
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     const step = await Step.create({
//       stepNumber,
//       description,
//       image: req.file ? req.file.buffer : null, // store buffer in DB
//       TaskId: taskId,
//     });

//     res.status(201).json(step);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// /* Get Step Image by Task Name and Step Number */
// router.get("/image/:taskName/:stepNumber", async (req, res) => {
//   try {
//     const { taskName, stepNumber } = req.params;

//     const task = await Task.findOne({ where: { taskName } });
//     if (!task) return res.status(404).json({ message: "Task not found" });

//     const step = await Step.findOne({
//       where: { TaskId: task.id, stepNumber },
//     });

//     if (!step || !step.image) return res.status(404).json({ message: "Image not found" });

//     res.set("Content-Type", "image/jpeg"); // assuming jpg/png
//     res.send(step.image);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;
const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer"); // memory storage
const { Step, Task } = require("../models");

/* Add Step */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { taskId, stepNumber, description } = req.body;

    const task = await Task.findByPk(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const step = await Step.create({
      stepNumber,
      description,
      image: req.file ? req.file.buffer : null,
      TaskId: taskId,
    });

    res.status(201).json(step);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* Get Step Image by Task Name and Step Number */
router.get("/image/:taskName/:stepNumber", async (req, res) => {
  try {
    const { taskName, stepNumber } = req.params;

    const task = await Task.findOne({ where: { taskName } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    const step = await Step.findOne({
      where: { TaskId: task.id, stepNumber },
    });

    if (!step || !step.image) return res.status(404).json({ message: "Image not found" });

    res.set("Content-Type", "image/jpeg"); // assuming jpg/png
    res.send(step.image);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* DELETE Step by ID */
// router.delete("/:id", async (req, res) => {
//   try {
//     const stepId = req.params.id;
//     console.log(stepId)

//     const step = await Step.findByPk(stepId);
//     if (!step) return res.status(404).json({ message: "Step not found" });

//     await step.destroy();

//     res.json({ message: "Step deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// How to delete step of particular task --------------------------

router.delete("/task/:taskId/step/:stepId", async (req, res) => {
  try {
    const { taskId, stepId } = req.params;

    const step = await Step.findOne({
      where: { id: stepId, TaskId: taskId },
    });
    if (!step) return res.status(404).json({ message: "Step not found in this task" });

    await step.destroy();
    res.json({ message: "Step deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

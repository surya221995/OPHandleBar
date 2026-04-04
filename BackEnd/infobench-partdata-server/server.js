const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const taskRoutes = require("./routes/taskRoutes");
const stepRoutes = require("./routes/stepRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);
app.use("/api/steps", stepRoutes);

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  app.listen(5000, () => console.log("Server running on port 5000"));
});

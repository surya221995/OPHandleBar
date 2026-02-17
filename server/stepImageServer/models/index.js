const sequelize = require("../config/database");
const Task = require("./Task");
const Step = require("./Step");

Task.hasMany(Step, { onDelete: "CASCADE" });
Step.belongsTo(Task);

module.exports = { sequelize, Task, Step };

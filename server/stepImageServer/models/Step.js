const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Step = sequelize.define("Step", {
  stepNumber: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.TEXT,
  },
  image: {
    type: DataTypes.BLOB("long"), // Store image in DB
    allowNull: true,
  },
});

module.exports = Step;

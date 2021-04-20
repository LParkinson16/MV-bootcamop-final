const User = require("./user");
const Task = require("./task");
const { sequelize, DataTypes, Model } = require("../db");

class Project extends Model {}

Project.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: false,
  }
);

Project.hasMany(Task);
Task.belongsTo(Project);

module.exports = Project;

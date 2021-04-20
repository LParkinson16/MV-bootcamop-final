const { sequelize, DataTypes, Model } = require("./db");
const options = { sequelize, timestamps: false };
class Task extends Model {}
Task.init(
  {
    description: DataTypes.STRING,
    state: DataTypes.STRING
  },
  options
);

module.exports = Task;

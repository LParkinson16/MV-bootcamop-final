const { sequelize, DataTypes, Model } = require("../db");
const options = { sequelize, timestamps: false };
class Task extends Model {}
Task.init(
  {
    description: DataTypes.STRING,
    date: DataTypes.INTEGER,
  },
  options
);
Task.belongsTo(User);
module.exports = Task;



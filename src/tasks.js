const { sequelize, DataTypes, Model } = require("./db");

const options = { sequelize, timestamps: false };

class Tasks extends Model {}

Tasks.init(
  {
    id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    date: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  },
  options
);

Tasks.belongsTo(User);

module.exports = Tasks;

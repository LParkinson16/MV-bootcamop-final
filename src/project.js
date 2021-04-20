const User = require('./user.js')
const Task = require('./task.js')
const {sequelize, DataTypes, Model} = require('../db');

class Project extends Model {

}

Project.init(
    {
        name:DataTypes.STRING,
        description:DataTypes.STRING,
    }, {
    sequelize,
    timestamps: false,
});

Project.hasMany(User)
User.belongsTo(Project)

module.exports = Project
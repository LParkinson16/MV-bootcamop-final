const Tasks = require('./tasks.js')
const {sequelize, DataTypes, Model} = require('../db');

class Project extends Model {

}

Project.init({
name:DataTypes.STRING,
description:DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

Project.hasMany(Task, {as: 'tasks'})
Task.belongsTo(Project)

module.exports = {
    Project
};
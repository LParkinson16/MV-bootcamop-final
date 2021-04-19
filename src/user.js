const Tasks = require('./tasks.js')
const {sequelize, DataTypes, Model} = require('../db');

class User extends Model {

}

User.init({
name:DataTypes.STRING,
avatar:DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

User.hasMany(Task, {as: 'tasks'})
Task.belongsTo(User)

module.exports = {
    User 
};
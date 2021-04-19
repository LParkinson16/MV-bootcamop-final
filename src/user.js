const Task = require('./task.js')
const {sequelize, DataTypes, Model} = require('../db');

class User extends Model {

}

User.init({
    name: { 
        type: DataTypes.STRING},
    avatar: {
        type: DataTypes.STRING}, 
}, {sequelize,
    timestamps: false,
});

User.hasMany(Task)
Task.belongsTo(User)

module.exports = User 
const { Sequelize, DataTypes, Model } = require('sequelize');
const path = require('path');

const location = process.env.NODE_ENV === 'test' ? ':memory:' : path.join(__dirname, 'to-do-app.sqlite');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: location
});

 module.exports = { sequelize, DataTypes, Model };
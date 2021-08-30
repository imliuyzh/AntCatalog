const Sequelize = require('sequelize');
const sequelize = require('../db/sequelize');
module.exports = sequelize.define('instructor', {
    term: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.TEXT,
    },
    courseCode: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.TEXT,
    }
});
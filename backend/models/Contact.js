const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(120),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: DataTypes.STRING(254),
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
}, {
  tableName: 'contacts',
  timestamps: true,
});

module.exports = Contact;

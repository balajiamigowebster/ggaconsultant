const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING(191),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: 'Bcrypt hashed password'
    },
    role: {
      type: DataTypes.STRING(50),
      defaultValue: 'admin'
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    tableName: 'users',
    timestamps: true
  }
);

module.exports = User;


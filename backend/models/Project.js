const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    allowNull: false,
  },
  slNo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  client: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  area_sqft: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  areaNumber: {
    type: DataTypes.BIGINT,
    allowNull: true,
    defaultValue: 0,
  },
  category: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Residential',
  },
  categoryLabel: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING(100),
    allowNull: true,
    defaultValue: 'Active / Current',
  },
  scope: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  featured: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  tag: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  sortOrder: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
}, {
  tableName: 'projects',
  timestamps: true,
});

module.exports = Project;


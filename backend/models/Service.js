const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.STRING(100),
    primaryKey: true,
    allowNull: false,
  },
  disciplineKey: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(150),
    allowNull: true,
    defaultValue: 'Plumbing & PHE',
  },
  disciplineNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: '01',
  },
  badge: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  shortTitle: {
    type: DataTypes.STRING(150),
    allowNull: true,
  },
  tagline: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  iconType: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: 'gear',
  },
  statHighlight: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  summary: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  coreScope: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  standards: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  deliverables: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
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
  tableName: 'services',
  timestamps: true,
});

module.exports = Service;


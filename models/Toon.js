//-- SQL Database ORM templates, essentially
const { Model, DataTypes } = require('sequelize');
//SQL Database ORM
const sequelize = require('../seeds/connection_sequelize');

//------------------------------------------------------------
//-- Class

// create our Character model
class Toon extends Model {
}

//------------------------------------------------------------

// define table columns and configuration
Toon.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    class: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'toon'
  }
);

module.exports = Toon;
//-- SQL Database ORM templates, essentially
const { Model, DataTypes } = require('sequelize');

//SQL Database ORM
/* 
  Pointing to seeds/connection_sequlzie because it's used by seeds to build
*/
const sequelize = require('../config/connection');

//------------------------------------------------------------
//-- Class

// create our User model
class Ability extends Model { };

//------------------------------------------------------------

// define table columns and configuration
Ability.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    hero_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'hero',
          key: 'id'
        }
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modifier: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ability'
  }
);
  
//-----------------------------------------------------------------------------
//-- EXPORTS

module.exports = Ability;
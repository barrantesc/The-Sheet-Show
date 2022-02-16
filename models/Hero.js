//WHAT OUR CHARACTERS ARE CALLED
//-- SQL Database ORM templates, essentially
const { Model, DataTypes } = require('sequelize');

//SQL Database ORM 
/* 
  Pointing to seeds/connection_sequlzie because it's used by seeds to build
*/
const sequelize = require('../config/connection');

//------------------------------------------------------------
//-- Class

// create our Character model
class Hero extends Model {}

//------------------------------------------------------------

// define table columns and configuration
Hero.init(
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
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    player_level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    proficiency_bonus: {
      type: DataTypes.INTEGER
    },
    alignment: {
      type: DataTypes.STRING(300),
    },
    languages: {
      type: DataTypes.STRING(100),
    },
    proficiencies: {
      type: DataTypes.STRING(100),
    },
    image_link: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'hero'
  }
);

//-- exporting to index.js
module.exports = Hero;
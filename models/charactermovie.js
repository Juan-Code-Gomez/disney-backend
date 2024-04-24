'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GendersMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  
  GendersMovies.init({
    GenderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Genders',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    MovieId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Movies',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'GendersMovies',
    tableName: 'GendersMovies',
    timestamps: true // Asegura que se utilicen los campos `createdAt` y `updatedAt`
  });
  
  return GendersMovies;
};
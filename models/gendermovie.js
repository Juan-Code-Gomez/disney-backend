'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class GendersMovies extends Model {
    /**
     * Define asociaciones (associations) aquí si es necesario, aunque no suelen ser necesarias para tablas intermedias.
     */
    static associate(models) {
      // No es necesario definir asociaciones aquí, ya que `Gender` y `Movie`
      // manejarán las asociaciones con `belongsToMany` automáticamente.
    }
  }

  // Define el modelo de la tabla `GendersMovies`.
  GendersMovies.init({
    GenderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Genders',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    MovieId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'Movies',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  }, {
    sequelize,
    modelName: 'GendersMovies',
    tableName: 'GendersMovies',
    timestamps: true, // Esto asegura que se gestionen `createdAt` y `updatedAt`
  });

  return GendersMovies;
};
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CharactersMovies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }

  CharactersMovies.init(
    {
      CharacterId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Characters",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      MovieId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: "Movies",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "CharactersMovies",
      tableName: "CharactersMovies",
      timestamps: true, // Asegura que se utilicen los campos `createdAt` y `updatedAt`
    }
  );

  return CharactersMovies;
};

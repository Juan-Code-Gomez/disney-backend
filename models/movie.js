"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.belongsToMany(models.Character, {
        through: "CharacterMovie",
        foreignKey: "movieId",
        otherKey: "characterId",
        timestamps: true,
      });

      // Define una relación de muchos a muchos entre Movie y Gender
      Movie.belongsToMany(models.Gender, {
        through: "GendersMovies",
        foreignKey: "MovieId",
        otherKey: "GenderId",
        timestamps: true,
      });
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      date_created: DataTypes.DATEONLY,
      image: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      character: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};

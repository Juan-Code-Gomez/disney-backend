'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Gender.belongsToMany(models.Movie, {
        through: "GendersMovies",
        foreignKey: "GenderId",
        otherKey: "MovieId",
        timestamps: true,
      });
    }
  }
  Gender.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    movie: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gender',
  });
  return Gender;
};
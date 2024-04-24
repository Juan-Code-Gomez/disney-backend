'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Character.belongsToMany(models.Movie, {
        through: 'CharacterMovie',
        foreignKey: 'characterId',
        otherKey: 'movieId',
        timestamps: true,
      });
    }
  }
  Character.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    history: DataTypes.STRING,
    image: DataTypes.STRING,
    movie: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Character',
  });
  return Character;
};
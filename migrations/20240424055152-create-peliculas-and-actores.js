'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CharacteresMovies', {
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      CharacterId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Characters',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      MovieId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Movies',
          key: 'id'
        },
        onDelete: 'CASCADE'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CharacteresMovies');
  }
};

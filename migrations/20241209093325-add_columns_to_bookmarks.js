'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Bookmarks', 'last_visited', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    await queryInterface.addColumn('Bookmarks', 'count', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });

    await queryInterface.addColumn('Bookmarks', 'description', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Bookmarks', 'last_visited');
    await queryInterface.removeColumn('Bookmarks', 'count');
    await queryInterface.removeColumn('Bookmarks', 'description');
  },
};

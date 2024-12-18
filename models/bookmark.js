'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    static associate(models) {
      Bookmark.belongsToMany(models.Tag, {
        through: 'BookmarkTags',
        foreignKey: 'bookmarkId',
        otherKey: 'tagId',
        as: 'tags',
      });
    }
  }
  Bookmark.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_visited: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Bookmark',
    }
  );
  return Bookmark;
};

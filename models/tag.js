'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {

      Tag.belongsToMany(models.Bookmark, {
        through: 'BookmarkTags', 
        foreignKey: 'tagId',
        otherKey: 'bookmarkId',
        as: 'bookmarks',
      });
    }
  }
  Tag.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Tag',
    }
  );
  return Tag;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookmarkTags extends Model {
    static associate(models) {
      // A BookmarkTag belongs to a Bookmark
      BookmarkTags.belongsTo(models.Bookmark, {
        foreignKey: 'bookmarkId',
        onDelete: 'CASCADE', // When the Bookmark is deleted, remove its associations in BookmarkTags
      });

      // A BookmarkTag belongs to a Tag
      BookmarkTags.belongsTo(models.Tag, {
        foreignKey: 'tagId',
        onDelete: 'CASCADE', // When the Tag is deleted, remove its associations in BookmarkTags
      });
    }
  }

  BookmarkTags.init(
    {
      bookmarkId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Bookmarks', // Ensure this matches the name of your Bookmark model
          key: 'id',
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags', // Ensure this matches the name of your Tag model
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'BookmarkTags',
    }
  );

  return BookmarkTags;
};

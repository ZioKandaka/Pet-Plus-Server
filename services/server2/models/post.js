'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.Petshop)
    }
  }
  Post.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Title is required" },
        notEmpty: { msg: "Title is required" },
      },
    },
    news: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "News is required" },
        notEmpty: { msg: "News is required" },
      },
    },
    status: DataTypes.STRING,
    imageUrl:  DataTypes.STRING,
    PetshopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Petshop is required" },
        notEmpty: { msg: "Petshop is required" },
      },
    }
  }, {
    sequelize,
    modelName: 'Post',
  });

  Post.beforeCreate((post, options)=>{
    post.status = "Active"
  })
  return Post;
};
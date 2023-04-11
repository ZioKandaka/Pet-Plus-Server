"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pet.belongsTo(models.User, {foreignKey: "UserId"})
    }
  }
  Pet.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Pet name is required" },
          notEmpty: { msg: "Pet name is required" },
        },
      },
      imgUrl: DataTypes.STRING,
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Pet gender is required" },
          notEmpty: { msg: "Pet gender is required" },
        },
      },
      species: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Pet species is required" },
          notEmpty: { msg: "Pet species is required" },
        },
      },
      breed: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Pet breed is required" },
          notEmpty: { msg: "Pet breed is required" },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Pet description is required" },
          notEmpty: { msg: "Pet description is required" },
        },
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Pet weight is required" },
          notEmpty: { msg: "Pet weight is required" },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID required" },
          notEmpty: { msg: "User ID required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};

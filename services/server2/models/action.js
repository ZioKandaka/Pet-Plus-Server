"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Action.belongsTo(models.MedicalRecord);
      Action.belongsTo(models.Service);
    }
  }
  Action.init(
    {
      document: DataTypes.STRING,
      MedicalRecordId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Medical record ID is required" },
          notEmpty: { msg: "Medical record ID is required" },
        },
      },
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Service ID is required" },
          notEmpty: { msg: "Service ID is required" },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Total price is required" },
          notEmpty: { msg: "Total price is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "Action",
    }
  );
  return Action;
};

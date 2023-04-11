'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      DoctorSchedule.belongsTo(models.Petshop)
      DoctorSchedule.belongsTo(models.Doctor)
      DoctorSchedule.hasOne(models.PetSchedule)


    }
  }
  DoctorSchedule.init({
    day: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Day is required" },
        notEmpty: { msg: "Day is required" },
      },
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Time is required" },
        notEmpty: { msg: "Time is required" },
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Status is required" },
        notEmpty: { msg: "Status is required" },
      },
    },
    PetshopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Petshop is required" },
        notEmpty: { msg: "Petshop is required" },
      },
    },
    DoctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Doctor is required" },
        notEmpty: { msg: "Doctor is required" },
      },
    }
  }, {
    sequelize,
    modelName: 'DoctorSchedule',
  });
  return DoctorSchedule;
};
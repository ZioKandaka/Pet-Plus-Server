'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PetSchedule.belongsTo(models.Petshop)
      PetSchedule.belongsTo(models.DoctorSchedule)
      PetSchedule.hasOne(models.MedicalRecord)
    }
  }
  PetSchedule.init({
    complete: DataTypes.STRING,
    details: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "details is required" },
        notEmpty: { msg: "details is required" },
      },
    },
    PetId: DataTypes.INTEGER,
    PetshopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Petshop is required" },
        notEmpty: { msg: "Petshop is required" },
      },
    },
    DoctorScheduleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Doctor Schedule is required" },
        notEmpty: { msg: "Doctor Schedule is required" },
      },
    }
  }, {
    sequelize,
    modelName: 'PetSchedule',
  });
  PetSchedule.beforeCreate((pet, options)=>{
    pet.complete = "ongoing"
  })
  return PetSchedule;
};
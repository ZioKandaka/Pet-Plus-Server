'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Doctor.belongsTo(models.Petshop)
      Doctor.hasMany(models.DoctorSchedule)
      Doctor.hasMany(models.MedicalRecord)
      // Doctor.hasOne(models.PetSchedule)

    }
  }
  Doctor.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" },
      },
    },
    imgUrl: DataTypes.STRING,
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Gender is required" },
        notEmpty: { msg: "Gender is required" },
      },
    },
    education:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Education is required" },
        notEmpty: { msg: "Education is required" },
      },
    },
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
    modelName: 'Doctor',
  });
  return Doctor;
};
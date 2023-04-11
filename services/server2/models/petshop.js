'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Petshop extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Petshop.hasMany(models.Doctor)
      Petshop.hasMany(models.DoctorSchedule)
      Petshop.hasMany(models.Post)
      Petshop.hasMany(models.Service, {foreignKey: "PetshopId"})
      Petshop.hasMany(models.PetSchedule)
      Petshop.hasMany(models.MedicalRecord)



    }
  }
  Petshop.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: "Name is required" },
        notEmpty: { msg: "Name is required" },
      },
    },
    logo: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    location: DataTypes.GEOMETRY,
    phoneNumber: {
      type: DataTypes.STRING
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Petshop',
  });
  return Petshop;
};
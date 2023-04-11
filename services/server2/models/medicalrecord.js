'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MedicalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicalRecord.hasMany(models.Action)
      MedicalRecord.belongsTo(models.Doctor)
      MedicalRecord.belongsTo(models.PetSchedule)
      MedicalRecord.belongsTo(models.Petshop)

    }
  }
  MedicalRecord.init({
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: { msg: "notes is required" },
        notEmpty: { msg: "notes is required" },
      },
    },
    PetId: DataTypes.INTEGER,
    DoctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Doctor is required" },
        notEmpty: { msg: "Doctor is required" },
      },
    },
    PetScheduleId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Pet Schedule is required" },
        notEmpty: { msg: "Pet Schedule is required" },
      },
    },
    PetshopId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: "Pet Shop is required" },
        notEmpty: { msg: "Pet Shop is required" },
      },
    }
  }, {
    sequelize,
    modelName: 'MedicalRecord',
  });
  return MedicalRecord;
};
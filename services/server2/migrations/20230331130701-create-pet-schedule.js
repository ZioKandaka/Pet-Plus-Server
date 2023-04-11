'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PetSchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      complete: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.TEXT
      },
      PetId: {
        type: Sequelize.INTEGER
      },
      PetshopId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Petshops",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      DoctorScheduleId: {
        type: Sequelize.INTEGER,
        references: {
          model: "DoctorSchedules",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PetSchedules');
  }
};
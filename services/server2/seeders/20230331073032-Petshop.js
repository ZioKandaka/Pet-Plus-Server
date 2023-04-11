"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    let data = require("../data/petshop.json");
    data.forEach((el) => {
      let latLong = el.location.split(",");
      (el.location = Sequelize.fn(
        "ST_GeomFromText",
        `POINT(${latLong[0]} ${latLong[1]})`
      )),
        (el.createdAt = new Date()),
        (el.updatedAt = new Date());
    });
    await queryInterface.bulkInsert("Petshops", data);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Petshops", null, {});
  },
};

const { Petshop } = require("../models");
const db = require("../models");
const queryInterface = db.sequelize.getQueryInterface();
const Sequelize = db.Sequelize

async function seedPetshop() {
  try {
    await queryInterface.bulkDelete(
      "Petshops",
      {},
      { truncate: true, restartIdentity: true, cascade: true }
    );

    // console.log('MASUUUUUUUKKKKKKKKKK');
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
    // console.log(data, "{}{}{}{}")
    await Petshop.bulkCreate(data);
  } catch (error) {
    console.log(error, "<<<<<<<<<<<<<<<<<<<");
  }
}

module.exports = seedPetshop;

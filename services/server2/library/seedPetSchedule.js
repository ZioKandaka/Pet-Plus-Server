const { PetSchedule } = require("../models");
const db = require("../models");
const queryInterface = db.sequelize.getQueryInterface();

async function seedPetSchedule() {
  try {
    await queryInterface.bulkDelete(
      "PetSchedules",
      {},
      { truncate: true, restartIdentity: true, cascade: true }
    );

    // console.log("masuk petschedule");

    let data = require("../data/petSchedule.json");
    data = data.map((el) => {
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    // console.log(data, "{}{}{}{}")
    await PetSchedule.bulkCreate(data);

    const dataSche = await PetSchedule.findAll()
    // console.log("berhasil petschedule", dataSche);

  } catch (error) {
    console.log(error, "pet sche<<<<<<<<<<<<<<<<<<<");
  }
}

module.exports = seedPetSchedule;

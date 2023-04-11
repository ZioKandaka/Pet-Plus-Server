const { MedicalRecord } = require("../models");
const db = require("../models");
const queryInterface = db.sequelize.getQueryInterface();

async function seedMedicalRecord() {
  try {
    await queryInterface.bulkDelete(
      "MedicalRecords",
      {},
      { truncate: true, restartIdentity: true, cascade: true }
    );

    let data = require("../data/medical.json");
    data = data.map((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    // console.log(data, "{}{}{}{}")
    await MedicalRecord.bulkCreate(data);
  } catch (error) {
    console.log(error, "<<<<<<<<<<<<<<<<<<<");
  }
}

module.exports = seedMedicalRecord;

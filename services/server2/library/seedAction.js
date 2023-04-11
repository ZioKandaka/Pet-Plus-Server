const { Action } = require("../models");
const db = require("../models");
const queryInterface = db.sequelize.getQueryInterface();

async function seedAction() {
  try {
    await queryInterface.bulkDelete(
      "Actions",
      {},
      { truncate: true, restartIdentity: true, cascade: true }
    );

    let data = require("../data/action.json");
    data = data.map((el) => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });
    // console.log(data, "{}{}{}{}")
    await Action.bulkCreate(data);
  } catch (error) {
    console.log(error, "<<<<<<<<<<<<<<<<<<<");
  }
}

module.exports = seedAction;

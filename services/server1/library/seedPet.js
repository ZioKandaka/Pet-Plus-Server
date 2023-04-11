const { Pet } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()


async function bulkInsertPet() {
    try {
    await queryInterface.bulkDelete('Pets', {}, {truncate: true, restartIdentity: true, cascade:true})
    



    console.log('MASUUUUUUUKKKKKKKKKK');
    let data = require("../data/pet.json")
    data.forEach(el => {
        el.createdAt = new Date(),
        el.updatedAt = new Date()
    })
    console.log(data, "{}{}{}{}")
    await Pet.bulkCreate(data)
    // await queryInterface.bulkInsert('Pets', data)
    } catch (error) {
        console.log(error, '<<<<<<<<<<<<<<<<<<<')
    }
}

module.exports = bulkInsertPet
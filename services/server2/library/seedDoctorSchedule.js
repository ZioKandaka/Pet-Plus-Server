const { DoctorSchedule } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()

async function seedDocSched() {
    try {
    await queryInterface.bulkDelete('DoctorSchedules', {}, {truncate: true, restartIdentity: true, cascade:true})
    
    // console.log('MASUUUUUUUKKKKKKKKKK');
    let data = require("../data/doctorSchedule.json")
    data.forEach(el => {
        el.createdAt = new Date(),
        el.updatedAt = new Date()
    })
    // console.log(data, "{}{}{}{}")
   await DoctorSchedule.bulkCreate(data)
//    console.log(result," >>>>>>>>>>>>>>>>>>>>>>>>>>");
    } catch (error) {
        console.log(error, '<<<<<<<<<<<<<<<<<<<')
    }
}

module.exports = seedDocSched
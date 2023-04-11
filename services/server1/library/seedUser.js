const { User } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()
const bcrypt = require('bcrypt');

async function bulkInsertUser() {
    try {
    await queryInterface.bulkDelete('Users', {}, {truncate: true, restartIdentity: true, cascade:true})
    
    // console.log('MASUUUUUUUKKKKKKKKKK');
    let data = require("../data/user.json")
    data.forEach(el => {
        el.password = bcrypt.hashSync(el.password, 10)
        el.createdAt = new Date(),
        el.updatedAt = new Date()
    })
    // console.log(data, "{}{}{}{}")
    await User.bulkCreate(data)
    } catch (error) {
        console.log(error, '<<<<<<<<<<<<<<<<<<<')
    }
}

module.exports = bulkInsertUser
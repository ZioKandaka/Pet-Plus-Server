const { Post } = require('../models')
const db = require('../models')
const queryInterface = db.sequelize.getQueryInterface()

async function seedPost() {
    try {
    await queryInterface.bulkDelete('Posts', {}, {truncate: true, restartIdentity: true, cascade:true})
    
    // console.log('MASUUUUUUUKKKKKKKKKK');
    let data = require("../data/post.json")
    data.forEach(el => {
        el.createdAt = new Date(),
        el.updatedAt = new Date()
    })
    // console.log(data, "{}{}{}{}")
    await Post.bulkCreate(data)
    } catch (error) {
        console.log(error, '<<<<<<<<<<<<<<<<<<<')
    }
}

module.exports = seedPost